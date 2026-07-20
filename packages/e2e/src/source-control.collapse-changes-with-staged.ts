import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'source-control.collapse-changes-with-staged'

export const test: Test = async ({ expect, Extension, FileSystem, Locator, SourceControl, Workspace }) => {
  const uri = import.meta.resolve('../fixtures/sample-source-control-provider')
  await Extension.addWebExtension(uri)
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/a.css`, 'a')
  await FileSystem.writeFile(`${tmpDir}/b.css`, 'b')
  await Workspace.setPath(tmpDir)
  await SourceControl.show()
  await SourceControl.handleClickSourceControlButtons(1, 'Stage')

  await SourceControl.selectIndex(2)

  const treeItems = Locator('.SourceControlItems .TreeItem')
  await expect(treeItems).toHaveCount(3)
  await expect(treeItems.nth(0)).toHaveText('Staged Changes1')
  await expect(treeItems.nth(1)).toHaveText('a.css')
  await expect(treeItems.nth(2)).toHaveText('Changes1')
  await expect(treeItems.nth(2)).toHaveAttribute('aria-expanded', 'false')
}
