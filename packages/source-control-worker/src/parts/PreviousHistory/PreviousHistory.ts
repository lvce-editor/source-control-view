import { InputSource } from '@lvce-editor/constants'
import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'
import { handleInput } from '../HandleInput/HandleInput.ts'

export const previousHistory = async (state: SourceControlState): Promise<SourceControlState> => {
  const { history, historyDraft, historyIndex, inputValue } = state
  if (history.length === 0) {
    return state
  }
  const newHistoryIndex = historyIndex === -1 ? history.length - 1 : Math.max(historyIndex - 1, 0)
  if (newHistoryIndex === historyIndex) {
    return state
  }
  const newHistoryDraft = historyIndex === -1 ? inputValue : historyDraft
  return handleInput(
    {
      ...state,
      historyDraft: newHistoryDraft,
      historyIndex: newHistoryIndex,
    },
    history[newHistoryIndex],
    InputSource.Script,
  )
}
