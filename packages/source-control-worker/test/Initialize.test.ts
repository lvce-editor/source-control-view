import { test, expect } from '@jest/globals'
import * as RpcRegistry from '@lvce-editor/rpc-registry'
import { initialize } from '../src/parts/Initialize/Initialize.ts'
import * as ParentRpc from '../src/parts/ParentRpc/ParentRpc.ts'
import * as RpcId from '../src/parts/RpcId/RpcId.ts'

test('initialize', async () => {
  const commandMap = {}
  const mockRpc = ParentRpc.registerMockRpc(commandMap)
  await initialize()
  const actual = RpcRegistry.get(RpcId.ExtensionHostWorker)
  expect(actual).toBeDefined()
  await actual.dispose()
})
