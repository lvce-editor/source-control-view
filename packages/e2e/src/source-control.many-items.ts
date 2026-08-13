import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'source-control.many-items'

export const test: Test = async ({ Command, expect, Extension, FileSystem, Locator, SourceControl, Workspace }) => {
  // arrange
  const uri = import.meta.resolve('../fixtures/sample-source-control-provider')
  await Extension.addWebExtension(uri)
  const tmpDir = await FileSystem.getTmpDir()
  const contents = Array.from(Array(1000), (_item, index) => index)
  await Promise.all(contents.map((i) => FileSystem.writeFile(`${tmpDir}/${i}.txt`, String(i))))
  await Workspace.setPath(tmpDir)

  // act
  await SourceControl.show()

  // assert
  const sourceControlView = Locator('.Viewlet.SourceControl')
  await expect(sourceControlView).toBeVisible()
  const treeItems = Locator('.SourceControlItems .TreeItem')
  const changesItem = treeItems.nth(0)
  const firstFileItem = treeItems.nth(1)
  const scrollBar = sourceControlView.locator('.ScrollBar')
  const scrollBarThumb = scrollBar.locator('.ScrollBarThumb')
  await expect(changesItem).toHaveText('Changes1000')
  await expect(firstFileItem).toHaveText('0.txt')
  await expect(scrollBar).toBeVisible()
  await expect(scrollBarThumb).toBeVisible()

  // act
  await Command.execute('Source Control.handleWheel', 0, 200)

  // assert
  await expect(scrollBarThumb).toHaveCSS('translate', '0px 6px')

  // act
  const visibleFileItem = Locator('.SourceControlItems .TreeItem', { hasText: '10.txt' })
  await expect(visibleFileItem).toBeVisible()
  await Command.execute('Source Control.handleClickAt', 0, 145, '')

  // assert
  const diffEditor = Locator('.DiffEditor')
  const changedContent = Locator('.DiffEditorContentRight .DiffEditorRows')
  await expect(diffEditor).toBeVisible()
  await expect(changedContent).toContainText('10')
}
