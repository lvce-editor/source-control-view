import { ViewletCommand } from '@lvce-editor/constants'
import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'

export const renderCss = (oldState: SourceControlState, newState: SourceControlState): any => {
  const { id } = newState
  const css = `` // TODO
  return [ViewletCommand.SetCss, id, css]
}
