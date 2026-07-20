import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'source-control.decoration-ignored'

export const test: Test = async ({ expect, Extension, FileSystem, Locator, SourceControl, Workspace }) => {
  const uri = import.meta.resolve('../fixtures/sample-source-control-provider')
  await Extension.addWebExtension(uri)
  const tmpDir = await FileSystem.getTmpDir()
  const file = `${tmpDir}/ignored.css`
  await FileSystem.writeFile(file, 'ignored')
  await Workspace.setPath(tmpDir)

  await SourceControl.show()

  const decoration = Locator('.SourceControlItems .DecorationIcon[src*="status-ignored.svg"]')
  await expect(decoration).toHaveCount(1)
  await expect(decoration).toHaveAttribute('title', 'Ignored')
}
