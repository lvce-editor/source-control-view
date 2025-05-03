import { expect, jest, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import { SourceControlWorker } from '../src/parts/RpcId/RpcId.js'
import { sendMessagePortToExtensionHostWorker } from '../src/parts/SendMessagePortToExtensionHostWorker/SendMessagePortToExtensionHostWorker.js'

test('sendMessagePortToExtensionHostWorker', async () => {
  const mockInvokeAndTransfer = jest.fn()
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: jest.fn(),
    invokeAndTransfer: mockInvokeAndTransfer,
  })
  RendererWorker.set(mockRpc)

  const port = new MessageChannel().port1
  await sendMessagePortToExtensionHostWorker(port)

  expect(mockInvokeAndTransfer).toHaveBeenCalledTimes(1)
  expect(mockInvokeAndTransfer).toHaveBeenCalledWith(
    'SendMessagePortToExtensionHostWorker.sendMessagePortToExtensionHostWorker',
    port,
    'HandleMessagePort.handleMessagePort2',
    SourceControlWorker,
  )
})
