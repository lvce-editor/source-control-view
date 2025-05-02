import type { ActionButton } from '../ActionButton/ActionButton.ts'
import type { DisplayItem } from '../DisplayItem/DisplayItem.ts'
import * as SourceControlActions from '../SourceControlActions/SourceControlActions.ts'

export const getNewButtons = async (displayItems: readonly DisplayItem[], providerId: string, buttonIndex: number): Promise<readonly ActionButton[]> => {
  if (buttonIndex === -1) {
    return []
  }
  const item = displayItems[buttonIndex]
  if (!item) {
    return []
  }
  const actions = await SourceControlActions.getSourceControlActions(providerId, item.groupId, item.type)
  return actions
}
