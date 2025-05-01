import { test, expect } from '@jest/globals'
import { initialize } from '../src/parts/Initialize/Initialize.ts'
import * as RpcId from '../src/parts/RpcId/RpcId.ts'
import * as RpcRegistry from '../src/parts/RpcRegistry/RpcRegistry.ts'
import { MockRpc } from '@lvce-editor/rpc'

test.skip('initialize', async () => {
  // @ts-ignore
  const mockRpc = MockRpc.create({
    commandMap: {},
    invokeAndTransfer: (method: string, ...params: any[]) => {
      return Promise.resolve()
    },
  })
  RpcRegistry.set(RpcId.RendererWorker, mockRpc)
  await initialize()
  const actual = RpcRegistry.get(RpcId.ExtensionHostWorker)
  expect(actual).toBeDefined()
})
