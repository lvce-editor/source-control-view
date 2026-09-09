import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'source-control.input-configuration'

export const test: Test = async ({ expect, Extension, FileSystem, Locator, SourceControl, Workspace }) => {
  // arrange
  const uri = import.meta.resolve('../fixtures/sample-source-control-provider')
  await Extension.addWebExtension(uri)
  const tmpDir = await FileSystem.getTmpDir()
  await Workspace.setPath(tmpDir)

  // act
  await SourceControl.show()
  await new Promise((resolve) => setTimeout(resolve, 2000))

  // assert
  const input = Locator('.SourceControl textarea.InputBox')
  await expect(input).toHaveAttribute('autocapitalize', 'off')
  await expect(input).toHaveAttribute('spellcheck', 'false')
}
