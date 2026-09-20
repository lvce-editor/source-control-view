import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'source-control.file-action-icons'

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
  const fileItem = Locator('.SourceControlItems .TreeItem').nth(1)
  const openFileIcon = fileItem.locator('.MaskIconGoToFile')
  await expect(openFileIcon).toHaveCount(1)
  const discardIcon = fileItem.locator('.MaskIconDiscard')
  await expect(discardIcon).toHaveCount(1)
  const stageIcon = fileItem.locator('.MaskIconAdd')
  await expect(stageIcon).toHaveCount(1)
}
