import { expect, test } from '@jest/globals'
import { PlatformType } from '@lvce-editor/constants'
import { ExtensionHost, ExtensionManagementWorker, RendererWorker } from '@lvce-editor/rpc-registry'
import * as ExtensionHostCommand from '../src/parts/ExtensionHostCommand/ExtensionHostCommand.ts'
import * as FileSystem from '../src/parts/FileSystem/FileSystem.ts'
import * as SourceControl from '../src/parts/SourceControl/SourceControl.ts'

test('provider activation retains its application while another application completes', async (): Promise<void> => {
  const pending = Promise.withResolvers<void>()
  const rpc = ExtensionManagementWorker.registerMockRpc({
    'Extensions.invokeForApplication': async (applicationId: string, method: string): Promise<unknown> => {
      if (method === 'Extensions.activateByEvent') {
        if (applicationId === 'source') {
          await pending.promise
        }
        return
      }
      return [{ id: applicationId }]
    },
  })
  const legacy = ExtensionHost.registerMockRpc({})
  const sourceGroups = SourceControl.getGroups('sample', 'memfs:///', '/assets', 2, 'source')
  expect(await SourceControl.getGroups('sample', 'memfs:///', '/assets', 2, 'preview')).toEqual([{ id: 'preview' }])
  pending.resolve()
  expect(await sourceGroups).toEqual([{ id: 'source' }])
  expect(rpc.invocations).toEqual([
    ['Extensions.invokeForApplication', 'source', 'Extensions.activateByEvent', 'none'],
    ['Extensions.invokeForApplication', 'preview', 'Extensions.activateByEvent', 'none'],
    ['Extensions.invokeForApplication', 'preview', 'ExtensionHostSourceControl.getGroups', 'sample', 'memfs:///'],
    ['Extensions.invokeForApplication', 'source', 'ExtensionHostSourceControl.getGroups', 'sample', 'memfs:///'],
  ])
  expect(legacy.invocations).toEqual([])
})

test('command arguments are not consumed as application ids', async (): Promise<void> => {
  const rpc = ExtensionManagementWorker.registerMockRpc({ 'Extensions.invokeForApplication': async (): Promise<void> => {} })
  await ExtensionHostCommand.executeCommandForApplication('preview', 'sample.stage', '/assets', 2, 'source', ['file.txt'])
  expect(rpc.invocations).toEqual([
    ['Extensions.invokeForApplication', 'preview', 'Extensions.activateByEvent', 'onCommand:sample.stage'],
    ['Extensions.invokeForApplication', 'preview', 'Extensions.executeCommand', 'sample.stage', 'source', ['file.txt']],
  ])
})

test('icon definitions come from the owning application manifest', async (): Promise<void> => {
  ExtensionManagementWorker.registerMockRpc({
    'Extensions.invokeForApplication': async (applicationId: string): Promise<unknown> => [
      { id: 'test.sample', 'source-control-icons': ['icons/modified.svg'], uri: `https://example.com/${applicationId}/` },
    ],
  })
  expect(await SourceControl.getIconDefinitions(['sample'], '/assets', PlatformType.Web, 'source')).toEqual(['https://example.com/source/icons/modified.svg'])
  expect(await SourceControl.getIconDefinitions(['sample'], '/assets', PlatformType.Web, 'preview')).toEqual(['https://example.com/preview/icons/modified.svg'])
})

test('file reads explicitly select the owning application', async (): Promise<void> => {
  const rpc = RendererWorker.registerMockRpc({
    'Application.execute': async (applicationId: string): Promise<string> => applicationId,
  })
  expect(await FileSystem.readFile('memfs:///file.txt', 'utf8', 'preview')).toBe('preview')
  expect(rpc.invocations).toEqual([['Application.execute', 'preview', 'FileSystem.readFile', 'memfs:///file.txt']])
})
