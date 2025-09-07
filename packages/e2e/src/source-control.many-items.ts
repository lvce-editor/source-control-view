import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'source-control.many-items'

export const test: Test = async ({ Locator, expect, QuickPick, Command, SideBar, FileSystem, Workspace, Extension }) => {
  // arrange
  const uri = new URL('../fixtures/sample-source-control-provider', import.meta.url).toString()
  await Extension.addWebExtension(uri)
  const tmpDir = await FileSystem.getTmpDir()
  for (let i = 0; i < 1000; i++) {
    await FileSystem.writeFile(`${tmpDir}/${i}.txt`, `${i}`)
  }
  await Workspace.setPath(tmpDir)

  // act
  await SideBar.open('Source Control')

  // assert
  const sourceControlView = Locator('.Viewlet.SourceControl')
  await expect(sourceControlView).toBeVisible()
  const treeItems = Locator('.SourceControlItems .TreeItem')
  await expect(treeItems.nth(0)).toHaveText('Changes1000')
  await expect(treeItems.nth(1)).toHaveText('0.txt')
}
