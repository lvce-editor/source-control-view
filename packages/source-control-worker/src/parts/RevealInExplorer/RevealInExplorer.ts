import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'

export const revealInExplorer = async (state: SourceControlState, uri: string): Promise<SourceControlState> => {
  await RendererWorker.invoke('SideBar.show', 'Explorer')
  await RendererWorker.invoke('Explorer.reveal', uri)
  return state
}
