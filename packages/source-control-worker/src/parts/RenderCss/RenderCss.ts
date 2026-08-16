import { ViewletCommand } from '@lvce-editor/constants'
import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'
import * as GetIndentRightRule from '../GetIndentRightRule/GetIndentRightRule.ts'
import * as GetIndentRule from '../GetIndentRule/GetIndentRule.ts'
import * as GetUnique from '../GetUnique/GetUnique.ts'
import * as ScrollBarFunctions from '../ScrollBarFunctions/ScrollBarFunctions.ts'
import * as TreeItemPadding from '../TreeItemPadding/TreeItemPadding.ts'

export const renderCss = (oldState: SourceControlState, newState: SourceControlState): any => {
  const { deltaY, finalDeltaY, headerHeight, height, id, inputBoxHeight, itemHeight, scrollBarHeight, visibleItems } = newState
  const indents = visibleItems.map((item) => item.indent)
  const uniqueIndents = GetUnique.getUnique(indents)
  const indentRules = uniqueIndents.map(GetIndentRule.getIndentRule).join('\n')
  const indentRightRule = GetIndentRightRule.getIndentRightRule(TreeItemPadding.PaddingRight)
  const listHeight = Math.max(height - headerHeight, 0)
  const scrollBarY = scrollBarHeight > 0 ? ScrollBarFunctions.getScrollBarY(deltaY, finalDeltaY, listHeight, scrollBarHeight) : 0
  const itemOffset = -(deltaY % itemHeight)
  const indentCss = indentRules ? `${indentRules}\n` : ''
  const css = `:root {
  --SourceControlInputHeight: ${inputBoxHeight}px;
}

.SourceControl .ScrollBarThumb {
  height: ${scrollBarHeight}px;
  translate: 0 ${Math.round(scrollBarY)}px;
}

.SourceControlItems > .TreeItem:first-child {
  margin-top: ${itemOffset}px;
}

${indentCss}${indentRightRule}
`
  return [ViewletCommand.SetCss, id, css]
}
