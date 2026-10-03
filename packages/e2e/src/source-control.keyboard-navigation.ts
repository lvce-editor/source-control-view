import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'source-control.keyboard-navigation'

export const test: Test = async ({ Command, expect, Extension, FileSystem, KeyBoard, Locator, SourceControl, Workspace }) => {
  await Extension.addWebExtension(import.meta.resolve('../fixtures/sample-source-control-tree-provider'))
  const tmpDir = await FileSystem.getTmpDir()
  await Workspace.setUri(tmpDir)
  await SourceControl.show()

  const list = Locator('.SourceControlItems[role="tree"]')
  const treeItems = list.locator('[role="treeitem"]')
  const firstItem = treeItems.nth(0)
  const secondItem = treeItems.nth(1)
  await expect(treeItems).toHaveCount(6)

  // Focus the empty tree; it should show the list outline before any row is active.
  await Command.execute('Source Control.handleListFocus')
  const focusOutline = Locator('.SourceControlItems.FocusOutline')
  const activeItem = Locator('.SourceControlItems .TreeItemActive')
  await expect(focusOutline).toHaveCount(1)

  await KeyBoard.press('ArrowDown')
  await expect(activeItem).toHaveCount(1)
  await expect(firstItem).toHaveId('SourceControlTreeItemFocused')
  await expect(focusOutline).toHaveCount(0)
  await expect(activeItem).toHaveId('SourceControlTreeItemFocused')

  await KeyBoard.press('ArrowDown')
  await expect(activeItem).toHaveCount(1)
  await expect(secondItem).toHaveId('SourceControlTreeItemFocused')

  await KeyBoard.press('Home')
  await expect(firstItem).toHaveId('SourceControlTreeItemFocused')
  await KeyBoard.press('ArrowUp')
  await expect(firstItem).toHaveId('SourceControlTreeItemFocused')
}
