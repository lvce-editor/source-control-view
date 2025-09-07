import { RendererWorker } from '@lvce-editor/rpc-registry'

export const getTextHeight = async (
  input: string,
  width: number,
  fontFamily: string,
  fontSize: number,
  fontWeight: number,
  letterSpacing: number,
  lineHeight: number,
): Promise<number> => {
  try {
    // @ts-ignore
    const height = await RendererWorker.invoke(`MeasureTextHeight.measureTextBlockHeight`, input, fontFamily, fontSize, lineHeight, width)
    return height
  } catch {
    // fallback
    const lines = input.split('\n')
    const lineCount = lines.length
    const inputHeight = lineCount * lineHeight
    return inputHeight
  }
}
