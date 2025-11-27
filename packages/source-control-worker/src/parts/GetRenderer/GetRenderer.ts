import type { Renderer } from '../Renderer/Renderer.ts'
import * as DiffType from '../DiffType/DiffType.ts'
import { renderCss } from '../RenderCss/RenderCss.ts'
import { renderFocusContext } from '../RenderFocusContext/RenderFocusContext.ts'
import * as RenderItems from '../RenderItems/RenderItems.ts'
import { renderValue } from '../RenderValue/RenderValue.ts'

export const getRenderer = (diffType: number): Renderer => {
  switch (diffType) {
    case DiffType.RenderItems:
      return RenderItems.renderItems
    case DiffType.RenderValue:
      return renderValue
    case DiffType.RenderCss:
      return renderCss
    case DiffType.RenderFocusContext:
      return renderFocusContext
    default:
      throw new Error('unknown renderer')
  }
}
