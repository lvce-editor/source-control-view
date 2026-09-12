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
  await new Promise((resolve) => setTimeout(resolve, 2000))

  // assert
  const treeItems = Locator('.SourceControlItems .TreeItem')
  const changesItem = treeItems.nth(0)
  const changesActions = changesItem.locator('.SourceControlButton')
  await expect(changesActions).toHaveCount(2)
  const discardAllButton = changesItem.locator('.SourceControlButton[name="Discard All"]')
  await expect(discardAllButton).toHaveCount(1)
  const stageAllButton = changesItem.locator('.SourceControlButton[name="Stage All"]')
  await expect(stageAllButton).toHaveCount(1)

  const fileItem = treeItems.nth(1)
  const fileActions = fileItem.locator('.SourceControlButton')
  await expect(fileActions).toHaveCount(3)
  const openFileButton = fileItem.locator('.SourceControlButton[name="Open File"]')
  await expect(openFileButton).toHaveCount(1)
  const discardButton = fileItem.locator('.SourceControlButton[name="Discard"]')
  await expect(discardButton).toHaveCount(1)
  const stageButton = fileItem.locator('.SourceControlButton[name="Stage"]')
  await expect(stageButton).toHaveCount(1)
}
