import * as DiffCss from '../DiffCss/DiffCss.ts'
import * as DiffItems from '../DiffItems/DiffItems.ts'
import * as DiffType from '../DiffType/DiffType.ts'
import * as DiffValue from '../DiffValue/DiffValue.ts'

export const modules = [DiffItems.isEqual, DiffValue.isEqual, DiffCss.isEqual]

export const numbers = [DiffType.RenderItems, DiffType.RenderValue, DiffType.RenderCss]
