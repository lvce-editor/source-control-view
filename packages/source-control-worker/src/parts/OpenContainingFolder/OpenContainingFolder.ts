import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'

export const openContainingFolder = async (state: SourceControlState, uri: string): Promise<SourceControlState> => {
  await RendererWorker.invoke('OpenNativeFolder.openNativeFolder', uri)
  return state
}
