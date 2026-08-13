import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'source-control.group-actions-attributes'

export const test: Test = async ({ expect, Extension, FileSystem, Locator, SourceControl, Workspace }) => {
  const uri = import.meta.resolve('../fixtures/sample-source-control-provider')
  await Extension.addWebExtension(uri)
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/test.css`, 'abc')
  await Workspace.setPath(tmpDir)

  await SourceControl.show()

  const group = Locator('.SourceControlItems .TreeItem').nth(0)
  await expect(group.locator('.SourceControlButton[aria-label="Discard All"][title="Discard All"]')).toHaveCount(1)
  await expect(group.locator('.SourceControlButton[aria-label="Stage All"][title="Stage All"]')).toHaveCount(1)
}
