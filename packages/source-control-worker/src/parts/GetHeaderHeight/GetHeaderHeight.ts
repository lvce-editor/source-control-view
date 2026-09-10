import type { ActionButton } from '../ActionButton/ActionButton.ts'

export const getHeaderHeight = (inputBoxHeight: number, sourceControlButtons: readonly ActionButton[], inputPaddingBlock: number, buttonBlockHeight: number): number => {
  return inputBoxHeight + inputPaddingBlock + sourceControlButtons.length * buttonBlockHeight
}
