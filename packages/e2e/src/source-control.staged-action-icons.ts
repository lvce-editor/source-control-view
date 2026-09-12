import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'source-control.staged-action-icons'

export const test: Test = async ({ expect, Extension, FileSystem, Locator, SourceControl, Workspace }) => {
  // arrange
  const uri = import.meta.resolve('../fixtures/sample-source-control-provider')
  await Extension.addWebExtension(uri)
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/test.css`, 'abc')
  await Workspace.setPath(tmpDir)
  await SourceControl.show()
  await new Promise((resolve) => setTimeout(resolve, 2000))

  // act
  await SourceControl.handleClickSourceControlButtons(1, 'Stage')

  // assert
  const treeItems = Locator('.SourceControlItems .TreeItem')
  const stagedGroup = treeItems.nth(0)
  const stagedFile = treeItems.nth(1)
  const unstageAllIcon = stagedGroup.locator('.MaskIconRemove')
  await expect(unstageAllIcon).toHaveCount(1)
  const openFileIcon = stagedFile.locator('.MaskIconGoToFile')
  await expect(openFileIcon).toHaveCount(1)
  const unstageIcon = stagedFile.locator('.MaskIconRemove')
  await expect(unstageIcon).toHaveCount(1)
}
