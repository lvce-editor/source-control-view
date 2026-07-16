import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'source-control.toggle-group'

export const test: Test = async ({ expect, Extension, FileSystem, Locator, SourceControl, Workspace }) => {
  // arrange
  const uri = import.meta.resolve('../fixtures/sample-source-control-provider')
  await Extension.addWebExtension(uri)
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/test.css`, 'abc')
  await Workspace.setPath(tmpDir)
  await SourceControl.show()
  const treeItems = Locator('.SourceControlItems .TreeItem')

  // act
  await SourceControl.selectIndex(0)

  // assert
  await expect(treeItems).toHaveCount(1)
  const collapsedChangesItem = treeItems.nth(0)
  await expect(collapsedChangesItem).toHaveText('Changes1')
  await expect(collapsedChangesItem).toHaveAttribute('aria-expanded', 'false')

  // act
  await SourceControl.selectIndex(0)

  // assert
  await expect(treeItems).toHaveCount(2)
  const expandedChangesItem = treeItems.nth(0)
  const fileItem = treeItems.nth(1)
  await expect(expandedChangesItem).toHaveText('Changes1')
  await expect(expandedChangesItem).toHaveAttribute('aria-expanded', 'true')
  await expect(fileItem).toHaveText('test.css')
}
