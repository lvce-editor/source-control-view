import { test, expect } from '@jest/globals'
import { initialize } from '../src/parts/Initialize/Initialize.ts'
import { MockRpc } from '../src/parts/MockRpc/MockRpc.ts'
import * as RpcId from '../src/parts/RpcId/RpcId.ts'
import * as RpcRegistry from '../src/parts/RpcRegistry/RpcRegistry.ts'

test.skip('initialize', async () => {
  const mockRpc = await MockRpc.create({
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
