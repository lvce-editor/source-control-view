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
  await new Promise((resolve) => setTimeout(resolve, 2000))

  const sourceControlItems = Locator('.ListItems.SourceControlItems')
  const treeItems = Locator('.SourceControlItems .TreeItem')
  const changesGroup = treeItems.nth(0)
  const firstFile = treeItems.nth(1)
  const secondFile = treeItems.nth(2)
  const thirdFile = treeItems.nth(3)
  const commitIcon = Locator('.SplitButtonContent .MaskIcon')
  const changesGroupsWithPaddingClasses = Locator('.SourceControlItems .TreeItem.Indent-0.IndentRight-12')
  const filesWithPaddingClasses = Locator('.SourceControlItems .TreeItem.Indent-16.IndentRight-12')
  await expect(sourceControlItems).toHaveCount(1)
  await expect(treeItems).toHaveCount(4)
  await expect(changesGroup).toBeVisible()
  await expect(firstFile).toBeVisible()
  await expect(secondFile).toBeVisible()
  await expect(thirdFile).toBeVisible()
  await expect(changesGroup).toHaveText('Changes3')
  await expect(firstFile).toHaveText('a.css')
  await expect(secondFile).toHaveText('b.css')
  await expect(thirdFile).toHaveText('c.css')
  await expect(commitIcon).toHaveCSS('width', '16px')
  await expect(commitIcon).toHaveCSS('height', '16px')
  await expect(commitIcon).toHaveCSS('margin-right', '4px')
  await expect(changesGroupsWithPaddingClasses).toHaveCount(1)
  await expect(filesWithPaddingClasses).toHaveCount(3)
  await expect(changesGroup).toHaveAttribute('style', null)
  await expect(firstFile).toHaveAttribute('style', null)
  await expect(secondFile).toHaveAttribute('style', null)
  await expect(thirdFile).toHaveAttribute('style', null)
}
