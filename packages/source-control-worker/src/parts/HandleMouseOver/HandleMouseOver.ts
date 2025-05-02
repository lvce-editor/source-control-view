import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'
import * as SourceControlActions from '../SourceControlActions/SourceControlActions.js'

export const handleMouseOver = async (state: SourceControlState, index: number): Promise<SourceControlState> => {
  const { items, providerId, buttonIndex } = state
  if (index === buttonIndex) {
    return state
  }
  const item = items[index]
  if (!item) {
    return state
  }
  const actions = await SourceControlActions.getSourceControlActions(providerId, item.groupId, item.type)
  return {
    ...state,
    buttonIndex: index,
    buttons: actions,
  }
}
