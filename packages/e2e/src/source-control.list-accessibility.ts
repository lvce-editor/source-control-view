import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'source-control.list-accessibility'

export const test: Test = async ({ expect, Extension, FileSystem, Locator, SourceControl, Workspace }) => {
  // arrange
  await Extension.addWebExtension(import.meta.resolve('../fixtures/sample-source-control-provider'))
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/test.css`, 'abc')
  await Workspace.setUri(tmpDir)
  await SourceControl.show()

  // act
  const tree = Locator('.ListItems.SourceControlItems[role="tree"]')
  await expect(tree).toHaveAttribute('tabindex', '0')
}
