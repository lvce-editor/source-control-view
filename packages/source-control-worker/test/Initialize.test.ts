import { test, expect } from '@jest/globals'
import * as RpcRegistry from '@lvce-editor/rpc-registry'
import { RpcId } from '@lvce-editor/rpc-registry'
import { RendererWorker as ParentRpc } from '@lvce-editor/rpc-registry'
import { initialize } from '../src/parts/Initialize/Initialize.ts'

test('initialize', async (): Promise<void> => {
  const commandMap = {
    'SendMessagePortToExtensionHostWorker.sendMessagePortToExtensionHostWorker': (): Promise<void> => Promise.resolve(),
  }
  ParentRpc.registerMockRpc(commandMap)
  await initialize()
  const actual = RpcRegistry.get(RpcId.ExtensionHostWorker)
  expect(actual).toBeDefined()
  await actual.dispose()
})
