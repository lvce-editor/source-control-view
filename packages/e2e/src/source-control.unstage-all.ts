import { type Test } from '@lvce-editor/test-with-playwright'

export const name = 'source-control.unstage-all'

export const test: Test = async ({ SourceControl, Locator, expect, FileSystem, Workspace, Extension }) => {
  // arrange
  const uri = new URL('../fixtures/sample-source-control-provider', import.meta.url).toString()
  await Extension.addWebExtension(uri)
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/test.css`, `abc`)
  await Workspace.setPath(tmpDir)
  await SourceControl.show()
  await SourceControl.handleClickSourceControlButtons(1, `Stage`)

  // act
  await SourceControl.handleClickSourceControlButtons(0, `Unstage All`)

  //  assert
  const sourceControlView = Locator('.Viewlet.SourceControl')
  await expect(sourceControlView).toBeVisible()
  const treeItems = Locator('.SourceControlItems .TreeItem')
  await expect(treeItems).toHaveCount(2)
  await expect(treeItems.nth(0)).toHaveText('Changes1')
  await expect(treeItems.nth(1)).toHaveText('test.css')
}
