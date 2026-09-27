interface RestoredState {
  readonly defaultInputValue?: string
  readonly history: readonly string[]
  readonly inputValue: string
}

const getRestoredDefaultInputValue = (savedState: unknown): string => {
  if (savedState && typeof savedState === 'object' && 'defaultInputValue' in savedState && typeof savedState.defaultInputValue === 'string') {
    return savedState.defaultInputValue
  }
  return ''
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
  const defaultInputValue = getRestoredDefaultInputValue(savedState)
  const inputValue = getRestoredInputValue(savedState)
  const history = getRestoredHistory(savedState, defaultHistory)
  if (savedState && typeof savedState === 'object' && 'defaultInputValue' in savedState && typeof savedState.defaultInputValue === 'string') {
    return { defaultInputValue, history, inputValue }
  }
  return { history, inputValue }
}
