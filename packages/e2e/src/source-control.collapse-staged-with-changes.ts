import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'source-control.collapse-staged-with-changes'

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

  await SourceControl.selectIndex(0)

  const stagedGroup = Locator('.SourceControlItems .TreeItem', { hasText: 'Staged Changes1' })
  const stagedFile = Locator('.SourceControlItems .TreeItem', { hasText: 'a.css' })
  await expect(stagedGroup).toHaveText('Staged Changes1')
  await expect(stagedGroup).toHaveAttribute('aria-expanded', 'false')
  await expect(stagedFile).toHaveCount(0)
}
