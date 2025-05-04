import { test, expect } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import * as RpcRegistry from '@lvce-editor/rpc-registry'
import { initialize } from '../src/parts/Initialize/Initialize.ts'
import * as ParentRpc from '../src/parts/ParentRpc/ParentRpc.ts'
import * as RpcId from '../src/parts/RpcId/RpcId.ts'

test('initialize', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke() {},
    invokeAndTransfer: (method: string, ...params: any[]) => {
      return Promise.resolve()
    },
  })
  ParentRpc.set(mockRpc)
  await initialize()
  const actual = RpcRegistry.get(RpcId.ExtensionHostWorker)
  expect(actual).toBeDefined()
})
