import { RpcId } from '@lvce-editor/rpc-registry'
import * as ParentRpc from '../ParentRpc/ParentRpc.ts'

export const sendMessagePortToExtensionHostWorker = async (port: MessagePort): Promise<void> => {
  const command = 'HandleMessagePort.handleMessagePort2'
  await ParentRpc.invokeAndTransfer('SendMessagePortToExtensionHostWorker.sendMessagePortToExtensionHostWorker', port, command, RpcId.SourceControlWorker)
}
