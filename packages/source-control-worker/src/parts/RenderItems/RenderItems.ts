import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'
import * as GetSourceControlDom from '../GetSourceControlVirtualDom/GetSourceControlVirtualDom.ts'
import * as GetVisibleSourceControlItems from '../GetVisibleSourceControlItems/GetVisibleSourceControlItems.js'

export const renderItems = (oldState: SourceControlState, newState: SourceControlState): any => {
  const visible = GetVisibleSourceControlItems.getVisibleSourceControlItems(newState.items, newState.minLineY, newState.maxLineY, newState.buttons, newState.buttonIndex)
  const dom = GetSourceControlDom.getSourceControlVirtualDom(visible, newState.splitButtonEnabled)
  return ['Viewlet.setDom2', dom]
}
