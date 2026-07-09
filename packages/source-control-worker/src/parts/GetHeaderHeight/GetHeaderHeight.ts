import type { ActionButton } from '../ActionButton/ActionButton.ts'

const inputPaddingBlock = 11
const buttonBlockHeight = 34

export const getHeaderHeight = (inputBoxHeight: number, sourceControlButtons: readonly ActionButton[]): number => {
  return inputBoxHeight + inputPaddingBlock + sourceControlButtons.length * buttonBlockHeight
}
