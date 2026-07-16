import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'source-control.open-changes-diff'

export const test: Test = async ({ expect, Extension, FileSystem, Locator, SourceControl, Workspace }) => {
  const uri = import.meta.resolve('../fixtures/sample-source-control-provider')
  await Extension.addWebExtension(uri)
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/test.css`, 'abc')
  await Workspace.setPath(tmpDir)

  await SourceControl.show()

  const fileItem = Locator('.SourceControlItems .TreeItem').nth(1)
  await expect(fileItem).toHaveText('test.css')
  await SourceControl.selectIndex(1)

  const diffEditor = Locator('.DiffEditor')
  const changedContent = Locator('.DiffEditorContentRight .DiffEditorRows')
  const errorMessage = Locator('.DiffEditorErrorMessage')
  await expect(diffEditor).toBeVisible()
  await expect(changedContent).toContainText('abc')
  await expect(errorMessage).toHaveCount(0)
}
