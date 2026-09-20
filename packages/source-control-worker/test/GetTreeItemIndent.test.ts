import { expect, test } from '@jest/globals'
import { DirentType } from '@lvce-editor/constants'
import { getTreeItemIndent } from '../src/parts/GetTreeItemIndent/GetTreeItemIndent.ts'

test('getTreeItemIndent - group', () => {
  expect(getTreeItemIndent(DirentType.Directory)).toBe(4)
  expect(getTreeItemIndent(DirentType.DirectoryExpanded)).toBe(4)
})

test('getTreeItemIndent - file', () => {
  expect(getTreeItemIndent(DirentType.File)).toBe(16)
})
