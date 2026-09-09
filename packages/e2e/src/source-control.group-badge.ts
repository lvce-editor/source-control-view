import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'source-control.group-badge'

export const test: Test = async ({ expect, Extension, FileSystem, Locator, SourceControl, Workspace }) => {
  // arrange
  const uri = import.meta.resolve('../fixtures/sample-source-control-provider')
  await Extension.addWebExtension(uri)
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.setFiles([
    { content: 'a', uri: `${tmpDir}/a.css` },
    { content: 'b', uri: `${tmpDir}/b.css` },
    { content: 'c', uri: `${tmpDir}/c.css` },
  ])
  await Workspace.setPath(tmpDir)

  // act
  await SourceControl.show()
  await new Promise((resolve) => setTimeout(resolve, 2000))

  // assert
  const group = Locator('.SourceControlItems .TreeItem').nth(0)
  await expect(group.locator('.SourceControlBadge')).toHaveText('3')
}
