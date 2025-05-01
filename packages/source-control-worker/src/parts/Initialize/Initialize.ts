import { createExtensionHostRpc } from '../CreateExtensionHostRpc/CreateExtensionHostRpc.ts'
import * as RpcId from '../RpcId/RpcId.ts'
import * as RpcRegistry from '../RpcRegistry/RpcRegistry.ts'

export const initialize = async (): Promise<void> => {
  const extensionHostRpc = await createExtensionHostRpc()
  RpcRegistry.set(RpcId.ExtensionHostWorker, extensionHostRpc)
}
