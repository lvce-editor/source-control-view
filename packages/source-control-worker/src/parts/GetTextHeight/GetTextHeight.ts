export const getTextHeight = async (input: string, width: number, fontFamily: string, fontSize: number, fontWeight: number, letterSpacing: number): Promise<number> => {
  // TODO
  // 1. ask renderer worker for text height with these variables
  const lines = input.split('\n')
  const lineCount = lines.length
  const lineHeight = 30
  const inputHeight = lineCount * lineHeight
  return inputHeight
}
