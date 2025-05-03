import { createExtensionHostRpc } from '../CreateExtensionHostRpc/CreateExtensionHostRpc.ts'
import * as ExtensionHost from '../ExtensionHost/ExtensionHost.ts'

export const initialize = async (): Promise<void> => {
  const extensionHostRpc = await createExtensionHostRpc()
  ExtensionHost.set(extensionHostRpc)
}
