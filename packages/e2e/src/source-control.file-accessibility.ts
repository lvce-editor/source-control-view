import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'source-control.file-accessibility'

export const test: Test = async ({ expect, Extension, FileSystem, Locator, SourceControl, Workspace }) => {
  const uri = import.meta.resolve('../fixtures/sample-source-control-provider')
  await Extension.addWebExtension(uri)
  const tmpDir = await FileSystem.getTmpDir()
  const file = `${tmpDir}/test.css`
  await FileSystem.writeFile(file, 'abc')
  await Workspace.setPath(tmpDir)

  await SourceControl.show()

  const fileItem = Locator('.SourceControlItems .TreeItem').nth(1)
  await expect(fileItem).toHaveAttribute('role', 'treeitem')
  await expect(fileItem).toHaveAttribute('aria-posinset', '1')
  await expect(fileItem).toHaveAttribute('aria-setsize', '1')
  await expect(fileItem).toHaveAttribute('title', 'test.css')
}
