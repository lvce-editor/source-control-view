import * as Rpc from '../ParentRpc/ParentRpc.ts'

export const activateByEvent = (event: string): Promise<void> => {
  return Rpc.invoke('ExtensionHostManagement.activateByEvent', event)
}
