import { ViewletCommand } from '@lvce-editor/constants'
import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'

export const renderCss = (oldState: SourceControlState, newState: SourceControlState): any => {
  const { id, inputBoxHeight } = newState
  const css = `:root {
  --SourceControlInputHeight: ${inputBoxHeight}px;
}
`
  return [ViewletCommand.SetCss, id, css]
}
