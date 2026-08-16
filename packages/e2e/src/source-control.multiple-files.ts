import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'source-control.multiple-files'

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
  const changesGroup = treeItems.nth(0)
  const firstFile = treeItems.nth(1)
  const secondFile = treeItems.nth(2)
  const thirdFile = treeItems.nth(3)
  await expect(treeItems).toHaveCount(4)
  await expect(changesGroup).toHaveText('Changes3')
  await expect(firstFile).toHaveText('a.css')
  await expect(secondFile).toHaveText('b.css')
  await expect(thirdFile).toHaveText('c.css')
  await expect(changesGroup).toHaveClass('TreeItem Indent-0 IndentRight-12')
  await expect(firstFile).toHaveClass('TreeItem Indent-16 IndentRight-12')
  await expect(secondFile).toHaveClass('TreeItem Indent-16 IndentRight-12')
  await expect(thirdFile).toHaveClass('TreeItem Indent-16 IndentRight-12')
  await expect(changesGroup).not.toHaveAttribute('style', 'padding-right: 12px;')
  await expect(firstFile).not.toHaveAttribute('style', 'padding-right: 12px;')
  await expect(secondFile).not.toHaveAttribute('style', 'padding-right: 12px;')
  await expect(thirdFile).not.toHaveAttribute('style', 'padding-right: 12px;')
}
