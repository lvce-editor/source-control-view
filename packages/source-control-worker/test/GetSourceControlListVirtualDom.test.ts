import { expect, test } from '@jest/globals'
import { WhenExpression } from '@lvce-editor/constants'
import { getSourceControlListVirtualDom } from '../src/parts/GetSourceControlListVirtualDom/GetSourceControlListVirtualDom.ts'

test('the focused empty source control tree receives the focus outline', () => {
  const result = getSourceControlListVirtualDom([], 0, false, WhenExpression.FocusSourceControlList, -1)
  expect(result[1]).toEqual(
    expect.objectContaining({
      ariaActiveDescendant: undefined,
      className: 'ListItems SourceControlItems FocusOutline',
    }),
  )
})

test('the focused source control tree points at its active item', () => {
  const result = getSourceControlListVirtualDom([], 0, false, WhenExpression.FocusSourceControlList, 0)
  expect(result[1]).toEqual(
    expect.objectContaining({
      ariaActiveDescendant: 'SourceControlTreeItemFocused',
      className: 'ListItems SourceControlItems',
    }),
  )
})
