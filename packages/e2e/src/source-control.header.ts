import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'source-control.header'

export const test: Test = async ({ expect, Extension, FileSystem, Locator, SourceControl, Workspace }) => {
  const uri = import.meta.resolve('../fixtures/sample-source-control-provider')
  await Extension.addWebExtension(uri)
  const tmpDir = await FileSystem.getTmpDir()
  await Workspace.setPath(tmpDir)

  await SourceControl.show()

  const header = Locator('.Viewlet.SourceControl .SourceControlHeader')
  await expect(header).toBeVisible()
  await expect(header.locator('textarea.InputBox.MultilineInputBox')).toHaveCount(1)
}
