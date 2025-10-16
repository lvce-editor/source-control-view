import { type Test } from '@lvce-editor/test-with-playwright'

export const name = 'source-control.handle-new-line'

export const skip = 1

export const test: Test = async ({ SourceControl, Locator, expect, FileSystem, Workspace, Extension }) => {
  // arrange
  const uri = new URL('../fixtures/sample-source-control-provider', import.meta.url).toString()
  await Extension.addWebExtension(uri)
  const tmpDir = await FileSystem.getTmpDir()
  await Workspace.setPath(tmpDir)
  await SourceControl.show()

  // act
  await SourceControl.handleInput('abc\ndef\n')

  // assert
  const input = Locator(`.SourceControl .InputBox`)
  await expect(input).toBeVisible()
  await expect(input).toHaveValue('abc\ndef\n')
  await expect(input).toHaveCSS('height', '60px')
}
