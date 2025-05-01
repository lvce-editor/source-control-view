export const info = (...args: readonly any[]): void => {
  // eslint-disable-next-line no-console
  console.info(...args)
}

export const warn = (...args: readonly any[]): void => {
  console.warn(...args)
}

export const error = (...args: readonly any[]): void => {
  console.error(...args)
}
