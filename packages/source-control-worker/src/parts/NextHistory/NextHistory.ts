import { InputSource } from '@lvce-editor/constants'
import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'
import { handleInput } from '../HandleInput/HandleInput.ts'

export const nextHistory = async (state: SourceControlState): Promise<SourceControlState> => {
  const { history, historyDraft, historyIndex } = state
  if (historyIndex === -1) {
    return state
  }
  if (historyIndex === history.length - 1) {
    return handleInput(
      {
        ...state,
        historyDraft: '',
        historyIndex: -1,
      },
      historyDraft,
      InputSource.Script,
    )
  }
  const newHistoryIndex = historyIndex + 1
  return handleInput(
    {
      ...state,
      historyIndex: newHistoryIndex,
    },
    history[newHistoryIndex],
    InputSource.Script,
  )
}
