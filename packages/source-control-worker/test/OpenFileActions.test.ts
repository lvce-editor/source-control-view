import { expect, test } from '@jest/globals'
import { ExtensionManagementWorker, RendererWorker } from '@lvce-editor/rpc-registry'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { openChanges } from '../src/parts/OpenChanges/OpenChanges.ts'
import { openContainingFolder } from '../src/parts/OpenContainingFolder/OpenContainingFolder.ts'
import { openFile } from '../src/parts/OpenFile/OpenFile.ts'
import { openFileHead } from '../src/parts/OpenFileHead/OpenFileHead.ts'
import { withApplicationRouting } from './test-util/WithApplicationRouting.ts'

const item = {
  badgeCount: 0,
  decorationIcon: '',
  decorationIconTitle: '',
  decorationStrikeThrough: false,
  detail: '',
  file: 'test.css',
  groupId: 'working-tree',
  icon: '',
  label: 'test.css',
  posInSet: 1,
  setSize: 1,
  type: 8,
}

test('open file targets the owning application', async () => {
  using rpc = RendererWorker.registerMockRpc({ 'Application.execute': async (): Promise<void> => {} })
  const state = { ...createDefaultState(), applicationId: 'preview' }
  expect(await openFile(state, '/workspace/test.css')).toBe(state)
  expect(rpc.invocations).toEqual([['Application.execute', 'preview', 'Main.openUri', { uri: 'file:///workspace/test.css' }]])
})

test('open file escapes filesystem paths when converting to a file uri', async () => {
  using rpc = RendererWorker.registerMockRpc({ 'Application.execute': async (): Promise<void> => {} })
  const state = { ...createDefaultState(), applicationId: 'preview' }
  await openFile(state, '/workspace/test file #1.css')
  expect(rpc.invocations).toEqual([['Application.execute', 'preview', 'Main.openUri', { uri: 'file:///workspace/test%20file%20%231.css' }]])
})

test('open file preserves existing uris', async () => {
  using rpc = RendererWorker.registerMockRpc({ 'Application.execute': async (): Promise<void> => {} })
  const state = { ...createDefaultState(), applicationId: 'preview' }
  await openFile(state, 'file:///workspace/test.css')
  expect(rpc.invocations).toEqual([['Application.execute', 'preview', 'Main.openUri', { uri: 'file:///workspace/test.css' }]])
})

test('open file converts Windows filesystem paths to file uris', async () => {
  using rpc = RendererWorker.registerMockRpc({ 'Application.execute': async (): Promise<void> => {} })
  const state = { ...createDefaultState(), applicationId: 'preview' }
  await openFile(state, 'C:\\workspace\\test file.css')
  expect(rpc.invocations).toEqual([['Application.execute', 'preview', 'Main.openUri', { uri: 'file:///C:/workspace/test%20file.css' }]])
})

test('open HEAD uses original provider contents and application routing', async () => {
  using extension = ExtensionManagementWorker.registerMockRpc(
    withApplicationRouting({
      'Extensions.invokeForApplication': async (_applicationId: string, method: string): Promise<string | undefined> =>
        method === 'ExtensionHostSourceControl.getFileBefore' ? 'original contents' : undefined,
    }),
  )
  using renderer = RendererWorker.registerMockRpc({ 'Application.execute': async (): Promise<void> => {} })
  const state = { ...createDefaultState(), applicationId: 'preview', enabledProviderIds: ['git'], items: [item], root: '/workspace' }
  expect(await openFileHead(state, '/workspace/test.css')).toBe(state)
  expect(extension.invocations.at(-1)).toEqual(['Extensions.invokeForApplication', 'preview', 'ExtensionHostSourceControl.getFileBefore', 'git', 'test.css'])
  expect(renderer.invocations).toEqual([['Application.execute', 'preview', 'Main.openUri', { uri: 'data://original contents' }]])
})

test('stale file entries do not open content', async () => {
  const state = createDefaultState()
  expect(await openFileHead(state, '/missing')).toBe(state)
  expect(await openChanges(state, '/missing')).toBe(state)
})

test('open containing folder uses native folder command', async () => {
  using rpc = RendererWorker.registerMockRpc({ 'OpenNativeFolder.openNativeFolder': async (): Promise<void> => {} })
  const state = createDefaultState()
  expect(await openContainingFolder(state, '/workspace/test.css')).toBe(state)
  expect(rpc.invocations).toEqual([['OpenNativeFolder.openNativeFolder', '/workspace/test.css']])
})
