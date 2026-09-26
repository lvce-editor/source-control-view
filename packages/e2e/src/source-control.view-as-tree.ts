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
  // eslint-disable-next-line e2e/no-direct-click -- Exercise the actual toolbar event that switches the view mode.
  await viewAsTree.click()

  // assert
  const changesGroup = treeItems.nth(0)
  await expect(changesGroup).toHaveText('Changes5')
  await expect(treeItems).toHaveCount(10)
  const electronFourLabel = treeItems.nth(1).locator('.Label')
  await expect(electronFourLabel).toHaveText('electron-4')
  const electronFourFile = treeItems.nth(2)
  await expect(electronFourFile).toHaveText('package.json')
  const performanceLabel = treeItems.nth(3).locator('.Label')
  await expect(performanceLabel).toHaveText('electron-44-performance')
  const performanceFile = treeItems.nth(4)
  await expect(performanceFile).toHaveText('mainProcess.js')
  const nestedLabel = treeItems.nth(5).locator('.Label')
  await expect(nestedLabel).toHaveText('nested')
  const nestedFile = treeItems.nth(6)
  await expect(nestedFile).toHaveText('package.json')
  const performancePackageFile = treeItems.nth(7)
  await expect(performancePackageFile).toHaveText('package.json')
  const electronSixLabel = treeItems.nth(8).locator('.Label')
  await expect(electronSixLabel).toHaveText('electron-6')
  const electronSixFile = treeItems.nth(9)
  await expect(electronSixFile).toHaveText('package.json')
  const performanceDirectory = treeItems.nth(3)
  await expect(performanceDirectory).toHaveAttribute('aria-expanded', 'true')

  // act
  // eslint-disable-next-line e2e/no-direct-click -- Verify directory row clicks collapse the rendered tree.
  await performanceDirectory.click()

  // assert
  await expect(treeItems).toHaveCount(6)
  await expect(performanceDirectory).toHaveAttribute('aria-expanded', 'false')
  const collapsedElectronSixLabel = treeItems.nth(4).locator('.Label')
  await expect(collapsedElectronSixLabel).toHaveText('electron-6')
  // eslint-disable-next-line e2e/no-direct-click -- Verify the collapsed directory row can expand again.
  await performanceDirectory.click()
  await expect(treeItems).toHaveCount(10)
  const addedDecorations = viewlet.locator('.DecorationIcon[title="Added"]')
  await expect(addedDecorations).toHaveCount(3)
  const modifiedDecorations = viewlet.locator('.DecorationIcon[title="Modified"]')
  await expect(modifiedDecorations).toHaveCount(2)
}
