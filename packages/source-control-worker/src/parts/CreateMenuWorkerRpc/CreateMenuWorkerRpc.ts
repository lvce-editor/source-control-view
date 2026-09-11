import { type Rpc, LazyTransferMessagePortRpcParent } from '@lvce-editor/rpc'
import { RendererWorker } from '@lvce-editor/rpc-registry'

const send = (port: MessagePort): Promise<void> => {
  return RendererWorker.invokeAndTransfer('SendMessagePortToExtensionHostWorker.sendMessagePortToMenuWorker', port)
}

export const createMenuWorkerRpc = (): Promise<Rpc> => {
  return LazyTransferMessagePortRpcParent.create({ commandMap: {}, send })
}
