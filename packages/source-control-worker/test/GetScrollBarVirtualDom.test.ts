import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../src/parts/DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as GetScrollBarVirtualDom from '../src/parts/GetScrollBarVirtualDom/GetScrollBarVirtualDom.ts'

test('getScrollBarVirtualDom - hidden', () => {
  expect(GetScrollBarVirtualDom.getScrollBarVirtualDom(0, false)).toEqual([])
})

test('getScrollBarVirtualDom - visible', () => {
  expect(GetScrollBarVirtualDom.getScrollBarVirtualDom(40, false)).toEqual([
    {
      childCount: 1,
      className: `${ClassNames.ScrollBar} ${ClassNames.ScrollBarSmall}`,
      onPointerDown: DomEventListenerFunctions.HandleScrollBarPointerDown,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      className: ClassNames.ScrollBarThumb,
      type: VirtualDomElements.Div,
    },
  ])
})

test('getScrollBarVirtualDom - active', () => {
  const result = GetScrollBarVirtualDom.getScrollBarVirtualDom(40, true)

  expect(result[1].className).toBe(`${ClassNames.ScrollBarThumb} ${ClassNames.ScrollBarThumbActive}`)
})
