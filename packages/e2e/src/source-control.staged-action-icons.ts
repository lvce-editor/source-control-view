import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'source-control.staged-action-icons'

export const test: Test = async ({ expect, Extension, FileSystem, Locator, SourceControl, Workspace }) => {
  const uri = import.meta.resolve('../fixtures/sample-source-control-provider')
  await Extension.addWebExtension(uri)
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/test.css`, 'abc')
  await Workspace.setPath(tmpDir)
  await SourceControl.show()
  await SourceControl.handleClickSourceControlButtons(1, 'Stage')

  const treeItems = Locator('.SourceControlItems .TreeItem')
  const stagedGroup = treeItems.nth(0)
  const stagedFile = treeItems.nth(1)
  await expect(stagedGroup.locator('.MaskIconRemove')).toHaveCount(1)
  await expect(stagedFile.locator('.MaskIconGoToFile')).toHaveCount(1)
  await expect(stagedFile.locator('.MaskIconRemove')).toHaveCount(1)
}
