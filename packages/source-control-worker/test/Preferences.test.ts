import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import { get } from '../src/parts/Preferences/Preferences.ts'

test('get', async (): Promise<void> => {
  const commandMap = {
    'Preferences.get': (): Promise<any> => Promise.resolve(false),
  }
  RendererWorker.registerMockRpc(commandMap)
  const result = await get('test')
  expect(result).toBe(false)
})
