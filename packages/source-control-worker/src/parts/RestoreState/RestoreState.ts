interface RestoredState {
  readonly history: readonly string[]
  readonly inputValue: string
}

const getRestoredInputValue = (savedState: unknown): string => {
  if (savedState && typeof savedState === 'object' && 'inputValue' in savedState && typeof savedState['inputValue'] === 'string') {
    return savedState.inputValue
  }
  return ''
}

const getRestoredHistory = (savedState: unknown, defaultHistory: readonly string[]): readonly string[] => {
  if (!savedState || typeof savedState !== 'object' || !('history' in savedState)) {
    return defaultHistory
  }
  const { history } = savedState
  if (Array.isArray(history) && history.every((item): item is string => typeof item === 'string')) {
    return history.slice(-100)
  }
  return []
}

export const restoreState = (savedState: unknown, defaultHistory: readonly string[] = []): RestoredState => {
  const inputValue = getRestoredInputValue(savedState)
  const history = getRestoredHistory(savedState, defaultHistory)
  return { history, inputValue }
}
