import * as Rpc from '../Rpc/Rpc.ts'

export const activateByEvent = (event: string): Promise<void> => {
  return Rpc.invoke('ExtensionHostManagement.activateByEvent', event)
}
