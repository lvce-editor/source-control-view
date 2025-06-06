import { test, expect } from '@jest/globals'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import { getSplitButtonVirtualDom } from '../src/parts/GetSplitButtonVirtualDom/GetSplitButtonVirtualDom.ts'
import * as VirtualDomElements from '../src/parts/VirtualDomElements/VirtualDomElements.ts'

test('getSourceControlItemsVirtualDom - with items', () => {
  const splitButtonEnabled = true
  const result = getSplitButtonVirtualDom(true, splitButtonEnabled, 'test')
  expect(result).toHaveLength(6)
  expect(result[0]).toEqual({
    type: VirtualDomElements.Div,
    className: ClassNames.SplitButton + ' ',
    childCount: 3,
  })
  expect(result[1]).toEqual({
    type: VirtualDomElements.Div,
    className: ClassNames.SplitButtonContent + ' ',
    childCount: 1,
    tabIndex: 0,
  })
  expect(result[2]).toEqual({
    type: VirtualDomElements.Text,
    text: 'test',
    childCount: 0,
  })
  expect(result[3]).toEqual({
    type: VirtualDomElements.Div,
    className: ClassNames.SplitButtonSeparator,
    childCount: 0,
  })
  expect(result[4]).toEqual({
    type: VirtualDomElements.Div,
    className: ClassNames.SplitButtonDropDown + ' ',
    childCount: 1,
    tabIndex: 0,
  })
  expect(result[5]).toEqual({
    type: VirtualDomElements.Div,
    className: `${ClassNames.MaskIcon} ${ClassNames.MaskIconChevronDown}`,
    childCount: 0,
  })
})

test.skip('getSourceControlItemsVirtualDom - without items', () => {
  const splitButtonEnabled = true
  const result = getSplitButtonVirtualDom(false, splitButtonEnabled, 'test')
  expect(result).toHaveLength(6)
  expect(result[0]).toEqual({
    type: VirtualDomElements.Div,
    className: `${ClassNames.SplitButton} ${ClassNames.SplitButtonDisabled}`,
    childCount: 3,
  })
  expect(result[1]).toEqual({
    type: VirtualDomElements.Div,
    className: `${ClassNames.SplitButtonContent} ${ClassNames.SplitButtonContentDisabled}`,
    childCount: 1,
    tabIndex: 0,
  })
  expect(result[2]).toEqual({
    type: VirtualDomElements.Text,
    text: 'test',
    childCount: 0,
  })
  expect(result[3]).toEqual({
    type: VirtualDomElements.Div,
    className: ClassNames.SplitButtonSeparator,
    childCount: 0,
  })
  expect(result[4]).toEqual({
    type: VirtualDomElements.Div,
    className: `${ClassNames.SplitButtonDropDown} ${ClassNames.SplitButtonDropDownDisabled}`,
    childCount: 1,
    tabIndex: 0,
  })
  expect(result[5]).toEqual({
    type: VirtualDomElements.Div,
    className: `${ClassNames.MaskIcon} ${ClassNames.MaskIconChevronDown}`,
    childCount: 0,
  })
})
