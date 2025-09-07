import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'source-control.renamed-file'

export const skip = 1

export const test: Test = async ({ SourceControl, Locator, expect, Command, SideBar, FileSystem, Workspace, Extension }) => {
  // arrange
  const uri = new URL('../fixtures/sample-source-control-provider', import.meta.url).toString()
  await Extension.addWebExtension(uri)
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/test-renamed.css`, `abc`)
  await Command.execute('ExtensionHost.executeCommand', `sampleSourceControl.rename`, `${tmpDir}/test.css`, `${tmpDir}/test-renamed.css`)
  await Workspace.setPath(tmpDir)
  await SideBar.open('Source Control')
  await SourceControl.handleClickSourceControlButtons(1, 'Stage')

  // act
  await SourceControl.handleClickSourceControlButtons(1, 'Unstage Changes')

  //  assert
  const sourceControlView = Locator('.Viewlet.SourceControl')
  await expect(sourceControlView).toBeVisible()
  const treeItems = Locator('.SourceControlItems .TreeItem')
  await expect(treeItems).toHaveCount(2)
  await expect(treeItems.nth(0)).toHaveText('Changes1')
  await expect(treeItems.nth(1)).toHaveText('test.css')
}
