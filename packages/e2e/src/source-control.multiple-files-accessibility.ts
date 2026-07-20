import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'source-control.multiple-files-accessibility'

export const test: Test = async ({ expect, Extension, FileSystem, Locator, SourceControl, Workspace }) => {
  const uri = import.meta.resolve('../fixtures/sample-source-control-provider')
  await Extension.addWebExtension(uri)
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/a.css`, 'a')
  await FileSystem.writeFile(`${tmpDir}/b.css`, 'b')
  await FileSystem.writeFile(`${tmpDir}/c.css`, 'c')
  await Workspace.setPath(tmpDir)

  await SourceControl.show()

  const treeItems = Locator('.SourceControlItems .TreeItem')
  await expect(treeItems.nth(1)).toHaveAttribute('aria-posinset', '1')
  await expect(treeItems.nth(1)).toHaveAttribute('aria-setsize', '3')
  await expect(treeItems.nth(2)).toHaveAttribute('aria-posinset', '2')
  await expect(treeItems.nth(2)).toHaveAttribute('aria-setsize', '3')
  await expect(treeItems.nth(3)).toHaveAttribute('aria-posinset', '3')
  await expect(treeItems.nth(3)).toHaveAttribute('aria-setsize', '3')
}
