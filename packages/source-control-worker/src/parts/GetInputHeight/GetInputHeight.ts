import { getTextHeight } from '../GetTextHeight/GetTextHeight.ts'

export const getInputHeight = async (input: string, width: number): Promise<number> => {
  const fontFamily = ``
  const fontWeight = 400
  const fontSize = 20
  const letterSpacing = 0.5
  const height = await getTextHeight(input, width, fontFamily, fontSize, fontWeight, letterSpacing)
  return height
}
