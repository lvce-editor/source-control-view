import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'source-control.multiple-files'

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
  await expect(treeItems).toHaveCount(4)
  await expect(treeItems.nth(0)).toHaveText('Changes3')
  await expect(treeItems.nth(1)).toHaveText('a.css')
  await expect(treeItems.nth(2)).toHaveText('b.css')
  await expect(treeItems.nth(3)).toHaveText('c.css')
}
