import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import { SourceControlWorker } from '../src/parts/RpcId/RpcId.js'
import { sendMessagePortToExtensionHostWorker } from '../src/parts/SendMessagePortToExtensionHostWorker/SendMessagePortToExtensionHostWorker.js'

test('sendMessagePortToExtensionHostWorker', async () => {
  const commandMap = {
    'SendMessagePortToExtensionHostWorker.sendMessagePortToExtensionHostWorker': () => Promise.resolve()
  }
  const mockRpc = RendererWorker.registerMockRpc(commandMap)

  const port = new MessageChannel().port1
  await sendMessagePortToExtensionHostWorker(port)

  expect(mockRpc.invocations).toEqual([
    ['SendMessagePortToExtensionHostWorker.sendMessagePortToExtensionHostWorker', port, 'HandleMessagePort.handleMessagePort2', SourceControlWorker]
  ])
})
