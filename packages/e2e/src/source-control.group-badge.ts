import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'source-control.group-badge'

export const test: Test = async ({ expect, Extension, FileSystem, Locator, SourceControl, Workspace }) => {
  const uri = import.meta.resolve('../fixtures/sample-source-control-provider')
  await Extension.addWebExtension(uri)
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/a.css`, 'a')
  await FileSystem.writeFile(`${tmpDir}/b.css`, 'b')
  await FileSystem.writeFile(`${tmpDir}/c.css`, 'c')
  await Workspace.setPath(tmpDir)

  await SourceControl.show()

  const group = Locator('.SourceControlItems .TreeItem').nth(0)
  await expect(group.locator('.SourceControlBadge')).toHaveText('3')
}
