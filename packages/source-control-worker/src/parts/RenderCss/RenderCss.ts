import { ViewletCommand } from '@lvce-editor/constants'
import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'
import * as GetUnique from '../GetUnique/GetUnique.ts'

const getIndentRule = (indent: number): string => {
  return `.Indent-${indent} {
  padding-left: ${indent}px;
}`
}

export const renderCss = (oldState: SourceControlState, newState: SourceControlState): any => {
  const { id, inputBoxHeight, visibleItems } = newState
  const indents = visibleItems.map((item) => item.indent)
  const uniqueIndents = GetUnique.getUnique(indents)
  const indentRules = uniqueIndents.map(getIndentRule).join('\n')
  const css = indentRules
    ? `:root {
  --SourceControlInputHeight: ${inputBoxHeight}px;
}
${indentRules}
`
    : `:root {
  --SourceControlInputHeight: ${inputBoxHeight}px;
}
`
  return [ViewletCommand.SetCss, id, css]
}
