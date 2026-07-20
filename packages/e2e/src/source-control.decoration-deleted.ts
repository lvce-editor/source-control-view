import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'source-control.decoration-deleted'

export const test: Test = async ({ expect, Extension, FileSystem, Locator, SourceControl, Workspace }) => {
  const uri = import.meta.resolve('../fixtures/sample-source-control-provider')
  await Extension.addWebExtension(uri)
  const tmpDir = await FileSystem.getTmpDir()
  const file = `${tmpDir}/deleted.css`
  await FileSystem.writeFile(file, 'deleted')
  await Workspace.setPath(tmpDir)

  await SourceControl.show()

  const fileItem = Locator('.SourceControlItems .TreeItem').nth(1)
  const decoration = fileItem.locator('.DecorationIcon')
  await expect(decoration).toHaveCount(1)
  await expect(decoration).toHaveAttribute('title', 'Deleted')
  await expect(fileItem.locator('.Label.StrikeThrough')).toHaveCount(1)
}
