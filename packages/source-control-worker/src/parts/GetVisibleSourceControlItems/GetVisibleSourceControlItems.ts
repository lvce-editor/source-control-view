import * as EmptySourceControlButtons from '../EmptySourceControlButtons/EmptySourceControlButton.ts'

export const getVisibleSourceControlItems = (items: readonly any[], minLineY: number, maxLineY: number, buttons: readonly any[], buttonIndex: number): readonly any[] => {
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
