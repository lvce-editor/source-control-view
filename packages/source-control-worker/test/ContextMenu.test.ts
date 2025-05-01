import { jest, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import * as RpcRegistry from '@lvce-editor/rpc-registry'
import { show } from '../src/parts/ContextMenu/ContextMenu.ts'
import { RendererWorker } from '../src/parts/RpcId/RpcId.ts'

test('show', async () => {
  const invoke = jest.fn()
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke,
  })
  RpcRegistry.set(RendererWorker, mockRpc)
  await show(1, 2, 3, 'test')
})
