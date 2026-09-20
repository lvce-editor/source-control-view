import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'source-control.input-wrap'

export const test: Test = async ({ expect, Extension, FileSystem, Locator, SourceControl, Workspace }) => {
  // arrange
  await Extension.addWebExtension(import.meta.resolve('../fixtures/sample-source-control-provider'))
  const tmpDir = await FileSystem.getTmpDir()
  await Workspace.setPath(tmpDir)
  await SourceControl.show()
  const input = Locator('.SourceControl textarea.InputBox')
  await expect(input).toBeVisible()

  // act
  const value = `first line\nsecond line\n${'unbroken-token-'.repeat(30)}`
  await SourceControl.handleInput(value)

  // assert
  await expect(input).toHaveValue(value)
  await expect(input).toHaveCSS('overflow-wrap', 'anywhere')
  await expect(input).toHaveCSS('white-space', 'pre-wrap')
}
