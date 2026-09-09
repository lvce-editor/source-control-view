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
  await expect(fileItem.locator('.MaskIconGoToFile')).toHaveCount(1)
  await expect(fileItem.locator('.MaskIconDiscard')).toHaveCount(1)
  await expect(fileItem.locator('.MaskIconAdd')).toHaveCount(1)
}
