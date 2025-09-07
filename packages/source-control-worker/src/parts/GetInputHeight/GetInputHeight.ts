export const getInputHeight = async (input: string, width: number): Promise<number> => {
  const lines = input.split('\n')
  const lineCount = lines.length
  const lineHeight = 30
  const inputHeight = lineCount * lineHeight
  return inputHeight
}
