import { RendererWorker } from '@lvce-editor/rpc-registry'

export const openUri = (uri: string, applicationId: string | undefined): Promise<void> => {
  // Legacy desktop views are still created without an application id.
  if (applicationId === undefined) {
    return RendererWorker.openUri(uri)
  }
  return RendererWorker.invoke('Application.execute', applicationId, 'Main.openUri', { uri })
}
