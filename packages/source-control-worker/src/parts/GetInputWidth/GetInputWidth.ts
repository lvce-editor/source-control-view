import type { ActionButton } from '../ActionButton/ActionButton.ts'

const sourceControlHeaderPadding = 32
const inputHorizontalInset = 14
const inputActionWidth = 24

export const getInputWidth = (width: number, inputActions: readonly ActionButton[]): number => {
  return Math.max(width - sourceControlHeaderPadding - inputHorizontalInset - inputActions.length * inputActionWidth, 0)
}
