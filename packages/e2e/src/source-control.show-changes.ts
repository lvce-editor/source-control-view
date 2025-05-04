import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'source-control.show-changes'

export const test: Test = async ({ Locator, expect, QuickPick, Command, SideBar, FileSystem, Workspace, Extension }) => {
  // arrange
  const uri = new URL('../fixtures/sample-source-control-provider', import.meta.url).toString()
  await Extension.addWebExtension(uri)
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/test.css`, `abc`)
  await Workspace.setPath(tmpDir)

  // act
  await SideBar.open('Source Control')

  // assert

  // TODO
}
