import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'

interface ViewletState {
  readonly currentViewletId?: string
  readonly parentUid?: number
  readonly uid: number
}

export const revealInExplorer = async (state: SourceControlState, uri: string): Promise<SourceControlState> => {
  await RendererWorker.invoke('SideBar.show', 'Explorer')
  const states = (await RendererWorker.invoke('Viewlet.getAllStates')) as Record<string, ViewletState>
  const viewlets = Object.values(states)
  const sideBar = viewlets.find((viewlet) => viewlet.currentViewletId === 'Explorer')
  const explorerUid = Math.max(...viewlets.filter((viewlet) => viewlet.parentUid === sideBar!.uid).map((viewlet) => viewlet.uid))
  await RendererWorker.invoke('Viewlet.executeViewletCommand', explorerUid, 'reveal', uri)
  await RendererWorker.invoke('Viewlet.executeViewletCommand', explorerUid, 'refresh')
  return state
}
