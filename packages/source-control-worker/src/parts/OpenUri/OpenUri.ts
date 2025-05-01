import * as Rpc from '../ParentRpc/ParentRpc.ts'

export const openUri = (uri: string): Promise<void> => {
  return Rpc.invoke('Main.openUri', uri)
}
