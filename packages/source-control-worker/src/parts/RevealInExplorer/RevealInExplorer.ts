import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'

interface TimerGlobal {
  readonly setTimeout: (callback: () => void, delay: number) => number
}

const timerGlobal = globalThis as unknown as TimerGlobal

const revealInExplorerActual = async (uri: string, applicationId?: string, uid?: number): Promise<void> => {
  if (applicationId !== undefined) {
    await RendererWorker.invoke('Application.executeForView', uid, 'SideBar.show', 'Explorer')
    await RendererWorker.invoke('Application.executeForView', uid, 'Explorer.reveal', uri)
    return
  }
  await RendererWorker.invoke('RevealInExplorer.reveal', uri)
}

export const revealInExplorer = (state: SourceControlState, uri: string): SourceControlState => {
  const { applicationId, id } = state
  timerGlobal.setTimeout(() => {
    void revealInExplorerActual(uri, applicationId, id).catch(() => {})
  }, 0)
  return state
}
