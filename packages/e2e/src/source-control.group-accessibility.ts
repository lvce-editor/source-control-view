import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'source-control.group-accessibility'

export const test: Test = async ({ expect, Extension, FileSystem, Locator, SourceControl, Workspace }) => {
  // arrange
  const uri = import.meta.resolve('../fixtures/sample-source-control-provider')
  await Extension.addWebExtension(uri)
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/test.css`, 'abc')
  await Workspace.setPath(tmpDir)

  // act
  await SourceControl.show()
  await new Promise((resolve) => setTimeout(resolve, 2000))

  // assert
  const group = Locator('.SourceControlItems .TreeItem').nth(0)
  await expect(group).toHaveAttribute('role', 'treeitem')
  await expect(group).toHaveAttribute('aria-expanded', 'true')
  await expect(group).toHaveAttribute('aria-posinset', '1')
  await expect(group).toHaveAttribute('aria-setsize', '1')
}
