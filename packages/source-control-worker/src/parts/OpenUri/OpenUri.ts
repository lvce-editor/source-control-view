import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as ApplicationRpc from '../ApplicationRpc/ApplicationRpc.ts'

export const openUri = (uri: string, applicationId?: string): Promise<void> => {
  return applicationId === undefined ? RendererWorker.openUri(uri) : ApplicationRpc.invoke(applicationId, 'Main.openUri', { uri })
}
