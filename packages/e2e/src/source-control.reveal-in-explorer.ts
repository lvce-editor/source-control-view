import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'source-control.reveal-in-explorer'

export const test: Test = async ({ Command, expect, Extension, FileSystem, Locator, SourceControl, Workspace }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/sample-source-control-provider')
  await Extension.addWebExtension(extensionUri)
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/test.css`, 'abc')
  await Workspace.setPath(tmpDir)
  await SourceControl.show()
  await new Promise((resolve) => setTimeout(resolve, 2000))
  const changedFile = Locator('.SourceControlItems .TreeItem[title="test.css"]')
  await expect(changedFile).toBeVisible()

  // act
  await Command.execute('Source Control.revealInExplorer', `${tmpDir}/test.css`)
  await new Promise((resolve) => setTimeout(resolve, 2000))

  // assert
  const explorer = Locator('.Viewlet.Explorer')
  await expect(explorer).toBeVisible()
  const revealedFile = explorer.locator('.TreeItem[aria-label="test.css"]')
  await expect(revealedFile).toBeVisible()
  await expect(revealedFile).toHaveId('TreeItemActive')
}
