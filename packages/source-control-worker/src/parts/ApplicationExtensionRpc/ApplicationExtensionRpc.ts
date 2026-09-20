import { ExtensionManagementWorker } from '@lvce-editor/rpc-registry'

export const invoke = async (applicationId: string, method: string, ...args: readonly unknown[]): Promise<any> => {
  return ExtensionManagementWorker.invoke('Extensions.invokeForApplication', applicationId, method, ...args)
}
