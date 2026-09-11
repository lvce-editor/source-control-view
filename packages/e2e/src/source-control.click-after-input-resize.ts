import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'source-control.click-after-input-resize'

export const test: Test = async ({ expect, Extension, FileSystem, Locator, SourceControl, Workspace }) => {
  // arrange
  const uri = import.meta.resolve('../fixtures/sample-source-control-provider')
  await Extension.addWebExtension(uri)
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/a.css`, 'first file')
  await FileSystem.writeFile(`${tmpDir}/b.css`, 'second file')
  await Workspace.setPath(tmpDir)

  await SourceControl.show()
  await new Promise((resolve) => setTimeout(resolve, 2000))

  const fileItem = Locator('.SourceControlItems .TreeItem').nth(1)
  await expect(fileItem).toHaveText('a.css')

  // act
  await SourceControl.handleInput('first line\nsecond line')
  // eslint-disable-next-line e2e/no-direct-click -- Verify row coordinates after the commit input resizes.
  await fileItem.click()
  await new Promise((resolve) => setTimeout(resolve, 2000))

  // assert
  const diffEditor = Locator('.DiffEditor')
  const changedContent = Locator('.DiffEditor .DiffEditorRows')
  const errorMessage = Locator('.DiffEditorErrorMessage')
  await expect(diffEditor).toBeVisible()
  await expect(changedContent).toContainText('first file')
  await expect(errorMessage).toHaveCount(0)
}
