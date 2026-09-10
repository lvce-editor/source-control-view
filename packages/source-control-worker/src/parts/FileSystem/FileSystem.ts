import { RendererWorker } from '@lvce-editor/rpc-registry'

export const readFile = async (uri: string, encoding = 'utf8', applicationId: string): Promise<string> => {
  return RendererWorker.invoke('Application.execute', applicationId, 'FileSystem.readFile', uri)
}
