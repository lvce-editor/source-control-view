import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'source-control.placeholder'

export const test: Test = async ({ Locator, expect, SideBar, FileSystem, Workspace, Extension }) => {
  // arrange
  const uri = new URL('../fixtures/sample-source-control-provider', import.meta.url).toString()
  await Extension.addWebExtension(uri)
  const tmpDir = await FileSystem.getTmpDir()
  await Workspace.setPath(tmpDir)

  // act
  await SideBar.open('Source Control')

  // assert
  const input = Locator(`.SourceControl .InputBox`)
  await expect(input).toBeVisible()
  await expect(input).toHaveAttribute(`placeholder`, `Message (Enter) to commit on 'master'`)
}
