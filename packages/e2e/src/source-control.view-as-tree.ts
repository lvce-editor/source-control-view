import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'source-control.view-as-tree'

export const test: Test = async ({ expect, Extension, FileSystem, Locator, SourceControl, Workspace }) => {
  // arrange
  const uri = import.meta.resolve('../fixtures/sample-source-control-tree-provider')
  await Extension.addWebExtension(uri)
  const tmpDir = await FileSystem.getTmpDir()
  await Workspace.setPath(tmpDir)
  await SourceControl.show()

  const viewlet = Locator('.Viewlet.SourceControl')
  const treeItems = viewlet.locator('.SourceControlItems .TreeItem')
  const actions = Locator('.SideBarTitleArea')

  // act
  const viewAsTree = actions.locator('[name="ViewAsTree"]')
  await expect(viewAsTree).toBeVisible()
  await expect(treeItems).toHaveCount(6)
  await viewAsTree.click()

  // assert
  await expect(treeItems.nth(0)).toHaveText('Changes5')
  await expect(treeItems).toHaveCount(10)
  await expect(treeItems.nth(1).locator('.Label')).toHaveText('electron-4')
  await expect(treeItems.nth(2)).toHaveText('package.json')
  await expect(treeItems.nth(3).locator('.Label')).toHaveText('electron-44-performance')
  await expect(treeItems.nth(4)).toHaveText('mainProcess.js')
  await expect(treeItems.nth(5).locator('.Label')).toHaveText('nested')
  await expect(treeItems.nth(6)).toHaveText('package.json')
  await expect(treeItems.nth(7)).toHaveText('package.json')
  await expect(treeItems.nth(8).locator('.Label')).toHaveText('electron-6')
  await expect(treeItems.nth(9)).toHaveText('package.json')
  const performanceDirectory = treeItems.nth(3)
  await expect(performanceDirectory).toHaveAttribute('aria-expanded', 'true')

  // act
  await performanceDirectory.click()

  // assert
  await expect(treeItems).toHaveCount(6)
  await expect(treeItems.nth(3)).toHaveAttribute('aria-expanded', 'false')
  await expect(treeItems.nth(4).locator('.Label')).toHaveText('electron-6')
  await treeItems.nth(3).click()
  await expect(treeItems).toHaveCount(10)
  await expect(viewlet.locator('.DecorationIcon[title="Added"]')).toHaveCount(3)
  await expect(viewlet.locator('.DecorationIcon[title="Modified"]')).toHaveCount(2)
}
