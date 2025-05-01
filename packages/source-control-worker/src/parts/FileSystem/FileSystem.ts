import * as Rpc from '../ParentRpc/ParentRpc.ts'

export const readFile = async (uri: string, encoding = 'utf8'): Promise<string> => {
  const content = await Rpc.invoke('FileSystem.readFile', uri)
  return content
}
