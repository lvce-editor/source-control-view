import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as ApplicationRpc from '../ApplicationRpc/ApplicationRpc.ts'

export const readFile = async (uri: string, encoding = 'utf8', applicationId?: string): Promise<string> => {
  const content = await (applicationId === undefined ? RendererWorker.readFile(uri) : ApplicationRpc.invoke(applicationId, 'FileSystem.readFile', uri))
  return content
}
