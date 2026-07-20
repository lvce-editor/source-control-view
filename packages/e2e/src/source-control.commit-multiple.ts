import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'source-control.commit-multiple'

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
  await SourceControl.handleClickSourceControlButtons(3, 'Stage')
  await SourceControl.handleInput('commit both files')

  await SourceControl.acceptInput()

  const treeItems = Locator('.SourceControlItems .TreeItem')
  const input = Locator('.SourceControl .InputBox')
  await expect(treeItems).toHaveCount(0)
  await expect(input).toHaveValue('')
}
