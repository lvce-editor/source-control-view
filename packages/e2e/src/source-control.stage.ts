import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'source-control.stage'

export const test: Test = async ({ Locator, expect, QuickPick, Command, SideBar, FileSystem, Workspace, Extension }) => {
  // arrange
  const uri = new URL('../fixtures/sample-source-control-provider', import.meta.url).toString()
  await Extension.addWebExtension(uri)
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/test.css`, `abc`)
  await Workspace.setPath(tmpDir)
  await SideBar.open('Source Control')

  // act
  await Command.execute('Source Control.handleClickSourceControlButtons', 1, `Stage`)

  // // assert
  const sourceControlView = Locator('.Viewlet.SourceControl')
  await expect(sourceControlView).toBeVisible()
  const treeItems = Locator('.SourceControlItems .TreeItem')
  await expect(treeItems).toHaveCount(2)
  await expect(treeItems.nth(0)).toHaveText('Staged Changes1')
  await expect(treeItems.nth(1)).toHaveText('test.css')
}
