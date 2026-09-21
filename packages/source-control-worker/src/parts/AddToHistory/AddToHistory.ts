const maxHistoryLength = 100

export const addToHistory = (history: readonly string[], value: string): readonly string[] => {
  if (!value) {
    return history
  }
  return [...history, value].slice(-maxHistoryLength)
}
