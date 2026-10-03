import { expect, test } from '@jest/globals'
import { getSourceControlItemId } from '../src/parts/GetSourceControlItemId/GetSourceControlItemId.ts'

test('selected items keep the selection id', () => {
  expect(getSourceControlItemId(true, true)).toBe('TreeItemActive')
})

test('focused items get a focus id', () => {
  expect(getSourceControlItemId(false, true)).toBe('SourceControlTreeItemFocused')
})

test('inactive items have no id', () => {
  expect(getSourceControlItemId(false, false)).toBeUndefined()
})
