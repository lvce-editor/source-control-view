import { type Test } from '@lvce-editor/test-with-playwright'

export const name = 'source-control.handle-input'

export const test: Test = async ({ Command, Locator, expect, SourceControl, FileSystem, Workspace, Extension }) => {
  // arrange
  const uri = new URL('../fixtures/sample-source-control-provider', import.meta.url).toString()
  await Extension.addWebExtension(uri)
  const tmpDir = await FileSystem.getTmpDir()
  await Workspace.setPath(tmpDir)
  await SourceControl.show()

  // act
  await Command.execute('Source Control.handleInput', 'abc', 2)

  // assert
  const input = Locator(`.SourceControl .InputBox`)
  await expect(input).toBeVisible()
  await expect(input).toHaveValue('abc')
}
