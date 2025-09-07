import { RendererWorker, RpcId } from '@lvce-editor/rpc-registry'

export const sendMessagePortToExtensionHostWorker = async (port: MessagePort): Promise<void> => {
  await RendererWorker.sendMessagePortToExtensionHostWorker(port, RpcId.SourceControlWorker)
}
