import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'source-control.mixed-groups'

export const test: Test = async ({ expect, Extension, FileSystem, Locator, SourceControl, Workspace }) => {
  const uri = import.meta.resolve('../fixtures/sample-source-control-provider')
  await Extension.addWebExtension(uri)
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.setFiles([
    { content: 'a', uri: `${tmpDir}/a.css` },
    { content: 'b', uri: `${tmpDir}/b.css` },
  ])
  await Workspace.setPath(tmpDir)
  await SourceControl.show()

  await SourceControl.handleClickSourceControlButtons(1, 'Stage')

  const treeItems = Locator('.SourceControlItems .TreeItem')
  const stagedGroup = treeItems.nth(0)
  const stagedFile = treeItems.nth(1)
  const changesGroup = treeItems.nth(2)
  const changedFile = treeItems.nth(3)
  await expect(treeItems).toHaveCount(4)
  await expect(stagedGroup).toHaveText('Staged Changes1')
  await expect(stagedFile).toHaveText('a.css')
  await expect(changesGroup).toHaveText('Changes1')
  await expect(changedFile).toHaveText('b.css')
}
