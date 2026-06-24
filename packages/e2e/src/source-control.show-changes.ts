import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'source-control.show-changes'

export const test: Test = async ({ expect, Extension, FileSystem, Locator, SourceControl, Workspace }) => {
  // arrange
  const uri = import.meta.resolve('../fixtures/sample-source-control-provider')
  await Extension.addWebExtension(uri)
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/test.css`, `abc`)
  await Workspace.setPath(tmpDir)

  // act
  await SourceControl.show()

  // assert
  const sourceControlView = Locator('.Viewlet.SourceControl')
  await expect(sourceControlView).toBeVisible()
  const treeItems = Locator('.SourceControlItems .TreeItem')
  await expect(treeItems).toHaveCount(2)
  const changesItem = treeItems.nth(0)
  const fileItem = treeItems.nth(1)
  await expect(changesItem).toHaveText('Changes1')
  await expect(fileItem).toHaveText('test.css')
}
