import { RendererWorker } from '@lvce-editor/rpc-registry'

export const readFile = async (uri: string, encoding = 'utf8', applicationId: string | undefined): Promise<string> => {
  if (applicationId === undefined) {
    return RendererWorker.readFile(uri)
  }
  return RendererWorker.invoke('Application.execute', applicationId, 'FileSystem.readFile', uri)
}
