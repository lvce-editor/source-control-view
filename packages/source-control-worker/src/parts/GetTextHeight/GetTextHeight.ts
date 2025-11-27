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
    if (!input) {
      return lineHeight
    }
    const actualInput = '\n' + input
    // TODO line height could also be like 1.5
    const lineHeightPx = `${lineHeight}px`
    // @ts-ignore
    const height = await RendererWorker.invoke(`MeasureTextHeight.measureTextBlockHeight`, actualInput, fontFamily, fontSize, lineHeightPx, width)
    return height
  } catch {
    // fallback
    const lines = input.split('\n')
    const lineCount = lines.length
    const inputHeight = lineCount * lineHeight
    return inputHeight
  }
}
