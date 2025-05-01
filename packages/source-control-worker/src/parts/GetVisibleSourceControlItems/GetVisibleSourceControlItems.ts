import type { DisplayItem } from '../DisplayItem/DisplayItem.ts'
import type { VisibleItem } from '../VisibleItem/VisibleItem.ts'
import * as EmptySourceControlButtons from '../EmptySourceControlButtons/EmptySourceControlButton.ts'

export const getVisibleSourceControlItems = (
  items: readonly DisplayItem[],
  minLineY: number,
  maxLineY: number,
  buttons: readonly any[],
  buttonIndex: number,
): readonly VisibleItem[] => {
  const visible = []
  for (let i = minLineY; i < maxLineY; i++) {
    const item = items[i]
    const itemButtons = i === buttonIndex ? buttons : EmptySourceControlButtons.emptySourceControlButtons
    visible.push({
      ...item,
      buttons: itemButtons,
    })
  }
  return visible
}
