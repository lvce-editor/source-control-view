import * as Rpc from '../Rpc/Rpc.ts'

export const openUri = (uri: string): Promise<void> => {
  return Rpc.invoke('Main.openUri', uri)
}
