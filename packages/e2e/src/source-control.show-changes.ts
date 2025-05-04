import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'source-control.show-changes'

export const skip = 1

export const test: Test = async ({ Locator, expect, QuickPick, Command, SideBar, FileSystem, Workspace }) => {
  // arrange
  await SideBar.open('Explorer')
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/test.css`, `abc`)
  await Workspace.setPath(tmpDir)
  await SideBar.open('Source Control')
}
