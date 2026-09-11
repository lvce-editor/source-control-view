import { RendererWorker } from '@lvce-editor/rpc-registry'

export const openUri = (uri: string, applicationId: string): Promise<void> => {
  return RendererWorker.invoke('Application.execute', applicationId, 'Main.openUri', { uri })
}
