import { test, expect } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import { getSplitButtonVirtualDom } from '../src/parts/GetSplitButtonVirtualDom/GetSplitButtonVirtualDom.ts'
import * as MergeClassNames from '../src/parts/MergeClassNames/MergeClassNames.ts'

test('getSourceControlItemsVirtualDom - with items', () => {
  const splitButtonEnabled = true
  const result = getSplitButtonVirtualDom(true, splitButtonEnabled, 'test')
  expect(result).toHaveLength(6)
  expect(result[0]).toEqual({
    type: VirtualDomElements.Div,
    className: ClassNames.SplitButton,
    childCount: 3,
  })
  expect(result[1]).toEqual({
    type: VirtualDomElements.Div,
    className: ClassNames.SplitButtonContent,
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
    className: ClassNames.SplitButtonDropDown,
    childCount: 1,
    tabIndex: 0,
  })
  expect(result[5]).toEqual({
    type: VirtualDomElements.Div,
    className: `${ClassNames.MaskIcon} ${ClassNames.MaskIconChevronDown}`,
    childCount: 0,
  })
})

test('getSourceControlItemsVirtualDom - without items', (): void => {
  const splitButtonEnabled = true
  const result = getSplitButtonVirtualDom(false, splitButtonEnabled, 'test')
  expect(result).toHaveLength(0)
})

test('getSourceControlItemsVirtualDom - splitButton disabled', (): void => {
  const splitButtonEnabled = false
  const result = getSplitButtonVirtualDom(true, splitButtonEnabled, 'test')
  expect(result).toHaveLength(0)
})

test('getSplitButtonVirtualDom - verifies className merging for SplitButton (line 14)', (): void => {
  const splitButtonEnabled = true
  const hasItems = true
  const result = getSplitButtonVirtualDom(hasItems, splitButtonEnabled, 'Commit')
  expect(result[0].className).toBe(MergeClassNames.mergeClassNames(ClassNames.SplitButton, hasItems ? '' : ClassNames.SplitButtonDisabled))
})

test('getSplitButtonVirtualDom - verifies className merging for SplitButtonContent (line 19)', (): void => {
  const splitButtonEnabled = true
  const hasItems = true
  const result = getSplitButtonVirtualDom(hasItems, splitButtonEnabled, 'Commit')
  expect(result[1].className).toBe(MergeClassNames.mergeClassNames(ClassNames.SplitButtonContent, hasItems ? '' : ClassNames.SplitButtonContentDisabled))
})

test('getSplitButtonVirtualDom - verifies SplitButtonSeparator structure (lines 25-27)', (): void => {
  const splitButtonEnabled = true
  const hasItems = true
  const result = getSplitButtonVirtualDom(hasItems, splitButtonEnabled, 'Commit')
  expect(result[3]).toEqual({
    type: VirtualDomElements.Div,
    className: ClassNames.SplitButtonSeparator,
    childCount: 0,
  })
})

test('getSplitButtonVirtualDom - verifies className merging for SplitButtonDropDown (line 31)', (): void => {
  const splitButtonEnabled = true
  const hasItems = true
  const result = getSplitButtonVirtualDom(hasItems, splitButtonEnabled, 'Commit')
  expect(result[4].className).toBe(MergeClassNames.mergeClassNames(ClassNames.SplitButtonDropDown, hasItems ? '' : ClassNames.SplitButtonDropDownDisabled))
})
