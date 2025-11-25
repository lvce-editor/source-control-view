import { ExtensionHost } from '@lvce-editor/rpc-registry'
import { createExtensionHostRpc } from '../CreateExtensionHostRpc/CreateExtensionHostRpc.ts'

export const initialize = async (): Promise<void> => {
  const extensionHostRpc = await createExtensionHostRpc()
  ExtensionHost.set(extensionHostRpc)
}
