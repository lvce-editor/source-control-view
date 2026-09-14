import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'source-control.open-changes-diff'

export const test: Test = async ({ expect, Extension, FileSystem, Locator, SourceControl, Workspace }) => {
  // arrange
  const uri = import.meta.resolve('../fixtures/sample-source-control-provider')
  await Extension.addWebExtension(uri)
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.setFiles([
    { content: 'a', uri: `${tmpDir}/a.css` },
    { content: 'b', uri: `${tmpDir}/b.css` },
  ])
  await Workspace.setPath(tmpDir)

  await SourceControl.show()
  await new Promise((resolve) => setTimeout(resolve, 2000))

  const firstFile = Locator('.SourceControlItems .TreeItem').nth(1)
  const secondFile = Locator('.SourceControlItems .TreeItem').nth(2)
  await expect(firstFile).toHaveText('a.css')
  await expect(secondFile).toHaveText('b.css')

  // act
  // eslint-disable-next-line e2e/no-direct-click -- Verify selection through the real row click path.
  await firstFile.click()
  await new Promise((resolve) => setTimeout(resolve, 2000))

  // assert
  const diffEditor = Locator('.DiffEditor')
  const changedContent = Locator('.DiffEditor .DiffEditorRows')
  const errorMessage = Locator('.DiffEditorErrorMessage')
  await expect(diffEditor).toBeVisible()
  await expect(changedContent).toContainText('a')
  await expect(errorMessage).toHaveCount(0)
  await expect(firstFile).toHaveId('TreeItemActive')

  // Move focus to the editor and ensure the selection remains visible.
  // eslint-disable-next-line e2e/no-direct-click -- Move focus away from the selected row.
  await diffEditor.click()
  await expect(firstFile).toHaveId('TreeItemActive')

  // act
  // eslint-disable-next-line e2e/no-direct-click -- Verify selection moves through the real row click path.
  await secondFile.click()
  await new Promise((resolve) => setTimeout(resolve, 2000))

  // assert
  await expect(secondFile).toHaveId('TreeItemActive')
}
