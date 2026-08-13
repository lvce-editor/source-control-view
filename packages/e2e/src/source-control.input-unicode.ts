import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'source-control.input-unicode'

export const test: Test = async ({ expect, Extension, FileSystem, Locator, SourceControl, Workspace }) => {
  const uri = import.meta.resolve('../fixtures/sample-source-control-provider')
  await Extension.addWebExtension(uri)
  const tmpDir = await FileSystem.getTmpDir()
  await Workspace.setPath(tmpDir)
  await SourceControl.show()

  await SourceControl.handleInput('fix: café ☕')

  const input = Locator('.SourceControl .InputBox')
  await expect(input).toHaveValue('fix: café ☕')
}
