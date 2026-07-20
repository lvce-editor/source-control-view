import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'source-control.file-action-attributes'

export const test: Test = async ({ expect, Extension, FileSystem, Locator, SourceControl, Workspace }) => {
  const uri = import.meta.resolve('../fixtures/sample-source-control-provider')
  await Extension.addWebExtension(uri)
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/test.css`, 'abc')
  await Workspace.setPath(tmpDir)

  await SourceControl.show()

  const fileItem = Locator('.SourceControlItems .TreeItem').nth(1)
  await expect(fileItem.locator('.SourceControlButton[aria-label="Open File"][title="Open File"]')).toHaveCount(1)
  await expect(fileItem.locator('.SourceControlButton[aria-label="Discard"][title="Discard"]')).toHaveCount(1)
  await expect(fileItem.locator('.SourceControlButton[aria-label="Stage"][title="Stage"]')).toHaveCount(1)
}
