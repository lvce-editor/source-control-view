import { test, expect } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import { readFile } from '../src/parts/FileSystem/FileSystem.ts'
import { withRendererApplicationRouting } from './test-util/WithApplicationRouting.ts'

test('readFile', async (): Promise<void> => {
  const commandMap = {
    'FileSystem.readFile': async (): Promise<string> => 'test content',
  }
  using mockRpc = RendererWorker.registerMockRpc(withRendererApplicationRouting(commandMap))
  const content = await readFile('test.txt', 'utf8', '')
  expect(content).toBe('test content')
  expect(mockRpc.invocations).toEqual([['Application.execute', '', 'FileSystem.readFile', 'test.txt']])
})

test('readFile supports legacy desktop views without an application id', async (): Promise<void> => {
  using mockRpc = RendererWorker.registerMockRpc({
    'FileSystem.readFile': async (): Promise<string> => 'test content',
  })
  expect(await readFile('test.txt', 'utf8', undefined)).toBe('test content')
  expect(mockRpc.invocations).toEqual([['FileSystem.readFile', 'test.txt']])
})
