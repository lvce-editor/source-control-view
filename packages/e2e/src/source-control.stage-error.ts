import { type Test } from '@lvce-editor/test-with-playwright'

export const name = 'source-control.stage-error'

export const skip = 1

export const test: Test = async ({ SourceControl, Locator, expect, SideBar, FileSystem, Workspace, Extension }) => {
  // arrange
  const uri = new URL('../fixtures/sample-source-control-provider-stage-error', import.meta.url).toString()
  await Extension.addWebExtension(uri)
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/test.css`, `abc`)
  await Workspace.setPath(tmpDir)
  await SideBar.open('Source Control')

  // act
  await SourceControl.handleClickSourceControlButtons(1, `Stage`)

  //  assert
  const sourceControlView = Locator('.Viewlet.SourceControl')
  await expect(sourceControlView).toBeVisible()
  const treeItems = Locator('.SourceControlItems .TreeItem')
  await expect(treeItems).toHaveCount(2)
  await expect(treeItems.nth(0)).toHaveText('Staged Changes1')
  await expect(treeItems.nth(1)).toHaveText('test.css')
}
