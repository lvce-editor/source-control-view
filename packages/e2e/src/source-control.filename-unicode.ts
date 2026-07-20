import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'source-control.filename-unicode'

export const test: Test = async ({ expect, Extension, FileSystem, Locator, SourceControl, Workspace }) => {
  const uri = import.meta.resolve('../fixtures/sample-source-control-provider')
  await Extension.addWebExtension(uri)
  const tmpDir = await FileSystem.getTmpDir()
  const file = `${tmpDir}/café-☕.css`
  await FileSystem.writeFile(file, 'abc')
  await Workspace.setPath(tmpDir)

  await SourceControl.show()

  const fileItem = Locator('.SourceControlItems .TreeItem').nth(1)
  await expect(fileItem).toHaveText('café-☕.css')
  await expect(fileItem).toHaveAttribute('title', 'café-☕.css')
}
