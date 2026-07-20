import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'source-control.multiple-files-accessibility'

export const test: Test = async ({ expect, Extension, FileSystem, Locator, SourceControl, Workspace }) => {
  const uri = import.meta.resolve('../fixtures/sample-source-control-provider')
  await Extension.addWebExtension(uri)
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.setFiles([
    { content: 'a', uri: `${tmpDir}/a.css` },
    { content: 'b', uri: `${tmpDir}/b.css` },
    { content: 'c', uri: `${tmpDir}/c.css` },
  ])
  await Workspace.setPath(tmpDir)

  await SourceControl.show()

  const treeItems = Locator('.SourceControlItems .TreeItem')
  const firstFile = treeItems.nth(1)
  const secondFile = treeItems.nth(2)
  const thirdFile = treeItems.nth(3)
  await expect(firstFile).toHaveAttribute('aria-posinset', '1')
  await expect(firstFile).toHaveAttribute('aria-setsize', '3')
  await expect(secondFile).toHaveAttribute('aria-posinset', '2')
  await expect(secondFile).toHaveAttribute('aria-setsize', '3')
  await expect(thirdFile).toHaveAttribute('aria-posinset', '3')
  await expect(thirdFile).toHaveAttribute('aria-setsize', '3')
}
