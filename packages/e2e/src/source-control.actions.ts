import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'source-control.actions'

export const test: Test = async ({ expect, Extension, FileSystem, Locator, SourceControl, Workspace }) => {
  // arrange
  const uri = import.meta.resolve('../fixtures/sample-source-control-provider')
  await Extension.addWebExtension(uri)
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/test.css`, 'abc')
  await Workspace.setPath(tmpDir)

  // act
  await SourceControl.show()

  // assert
  const treeItems = Locator('.SourceControlItems .TreeItem')
  const changesItem = treeItems.nth(0)
  const changesActions = changesItem.locator('.SourceControlButton')
  await expect(changesActions).toHaveCount(2)
  await expect(changesItem.locator('.SourceControlButton[name="Discard All"]')).toHaveCount(1)
  await expect(changesItem.locator('.SourceControlButton[name="Stage All"]')).toHaveCount(1)

  const fileItem = treeItems.nth(1)
  const fileActions = fileItem.locator('.SourceControlButton')
  await expect(fileActions).toHaveCount(3)
  await expect(fileItem.locator('.SourceControlButton[name="Open File"]')).toHaveCount(1)
  await expect(fileItem.locator('.SourceControlButton[name="Discard"]')).toHaveCount(1)
  await expect(fileItem.locator('.SourceControlButton[name="Stage"]')).toHaveCount(1)
}
