import { RendererWorker } from '@lvce-editor/rpc-registry'

export const readFile = async (uri: string, encoding = 'utf8', applicationId?: string): Promise<string> => {
  const content = await (applicationId === undefined
    ? RendererWorker.readFile(uri)
    : RendererWorker.invoke('Application.execute', applicationId, 'FileSystem.readFile', uri))
  return content
}
