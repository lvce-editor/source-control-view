import * as ParentRpc from '../ParentRpc/ParentRpc.ts'
import * as RpcId from '../RpcId/RpcId.ts'

export const sendMessagePortToExtensionHostWorker = async (port: MessagePort): Promise<void> => {
  const command = 'HandleMessagePort.handleMessagePort'
  await ParentRpc.invokeAndTransfer('SendMessagePortToExtensionHostWorker.sendMessagePortToExtensionHostWorker', port, command, RpcId.DebugWorker)
}
