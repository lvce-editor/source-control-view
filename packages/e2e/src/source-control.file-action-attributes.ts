import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'source-control.file-action-attributes'

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
  const openFileButton = fileItem.locator('.SourceControlButton[aria-label="Open File"][title="Open File"]')
  await expect(openFileButton).toHaveCount(1)
  const discardButton = fileItem.locator('.SourceControlButton[aria-label="Discard"][title="Discard"]')
  await expect(discardButton).toHaveCount(1)
  const stageButton = fileItem.locator('.SourceControlButton[aria-label="Stage"][title="Stage"]')
  await expect(stageButton).toHaveCount(1)
}
