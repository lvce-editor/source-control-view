import * as Rpc from '../Rpc/Rpc.ts'

export const readFile = async (uri: string, encoding = 'utf8'): Promise<string> => {
  const content = await Rpc.invoke('FileSystem.readFile', uri)
  return content
}
