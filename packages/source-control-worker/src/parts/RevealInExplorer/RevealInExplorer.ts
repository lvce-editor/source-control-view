import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'

interface ViewletState {
  readonly currentViewletId?: string
  readonly parentUid?: number
  readonly sideBarId?: number
  readonly uid?: number
}

const isViewletState = (value: unknown): value is ViewletState => {
  return typeof value === 'object' && value !== null
}

const getExplorerUid = (states: unknown): number => {
  if (!isViewletState(states)) {
    throw new TypeError('Viewlet states must be an object')
  }
  const viewlets = Object.values(states).filter(isViewletState)
  const layout = viewlets.find((viewlet) => typeof viewlet.sideBarId === 'number')
  const { sideBarId } = layout || {}
  const sideBar = viewlets.find((viewlet) => viewlet.uid === sideBarId && viewlet.currentViewletId === 'Explorer')
  const explorerUids = viewlets.filter((viewlet) => viewlet.parentUid === sideBar?.uid && typeof viewlet.uid === 'number').map((viewlet) => viewlet.uid as number)
  if (explorerUids.length === 0) {
    throw new Error('Explorer viewlet not found')
  }
  return Math.max(...explorerUids)
}

export const revealInExplorer = async (state: SourceControlState, uri: string): Promise<SourceControlState> => {
  await RendererWorker.invoke('SideBar.show', 'Explorer')
  const states = await RendererWorker.invoke('Viewlet.getAllStates')
  const explorerUid = getExplorerUid(states)
  await RendererWorker.invoke('Viewlet.executeViewletCommand', explorerUid, 'reveal', uri)
  await RendererWorker.invoke('Viewlet.executeViewletCommand', explorerUid, 'refresh')
  return state
}
