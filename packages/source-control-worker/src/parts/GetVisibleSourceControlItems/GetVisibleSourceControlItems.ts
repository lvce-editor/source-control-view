import type { ActionButton } from '../ActionButton/ActionButton.ts'
import type { DisplayItem } from '../DisplayItem/DisplayItem.ts'
import type { VisibleItem } from '../VisibleItem/VisibleItem.ts'
import * as EmptySourceControlButtons from '../EmptySourceControlButtons/EmptySourceControlButton.ts'

export const getVisibleSourceControlItems = (
  items: readonly DisplayItem[],
  minLineY: number,
  maxLineY: number,
  buttons: readonly ActionButton[],
  buttonIndex: number,
  icons: readonly string[],
): readonly VisibleItem[] => {
  const visible: VisibleItem[] = []
  for (let i = minLineY; i < maxLineY; i++) {
    const item = items[i]
    const itemButtons = i === buttonIndex ? buttons : EmptySourceControlButtons.emptySourceControlButtons
    const fileIcon = icons[i - minLineY]
    visible.push({
      ...item,
      buttons: itemButtons,
      fileIcon,
    })
  }
  return visible
}
