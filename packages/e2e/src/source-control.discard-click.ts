import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'source-control.discard-click'

export const test: Test = async ({ expect, Extension, FileSystem, Locator, SourceControl, Workspace }) => {
  // arrange
  const uri = import.meta.resolve('../fixtures/sample-source-control-provider')
  await Extension.addWebExtension(uri)
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.setFiles([
    { content: 'discard this file', uri: `${tmpDir}/discard.css` },
    { content: 'keep this file', uri: `${tmpDir}/preserve.css` },
  ])
  await Workspace.setUri(tmpDir)
  await SourceControl.show()

  const treeItems = Locator('.SourceControlItems .TreeItem')
  const discardItem = treeItems.nth(1)
  await expect(discardItem).toHaveText('discard.css')
  const discardIcon = discardItem.locator('.MaskIconDiscard')
  await expect(discardIcon).toBeVisible()

  // act: use the source-control row action command for this file.
  await SourceControl.handleClickSourceControlButtons(1, 'Discard')

  // assert: only the selected file was removed from disk and the view.
  let entries = await FileSystem.readDir(tmpDir)
  for (let i = 0; i < 50 && entries.length !== 1; i++) {
    await new Promise((resolve) => setTimeout(resolve, 100))
    entries = await FileSystem.readDir(tmpDir)
  }
  const fileNames = entries.map((entry) => entry.name)
  if (fileNames.length !== 1 || !fileNames.includes('preserve.css')) {
    throw new Error(`expected only preserve.css to remain, got ${JSON.stringify(fileNames)}`)
  }
  await expect(treeItems).toHaveCount(2)
  const changesGroup = treeItems.nth(0)
  const preservedItem = treeItems.nth(1)
  await expect(changesGroup).toHaveText('Changes1')
  await expect(preservedItem).toHaveText('preserve.css')
}
