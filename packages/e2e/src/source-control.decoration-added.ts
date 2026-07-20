import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'source-control.decoration-added'

export const test: Test = async ({ expect, Extension, FileSystem, Locator, SourceControl, Workspace }) => {
  const uri = import.meta.resolve('../fixtures/sample-source-control-provider')
  await Extension.addWebExtension(uri)
  const tmpDir = await FileSystem.getTmpDir()
  const file = `${tmpDir}/added.css`
  await FileSystem.writeFile(file, 'added')
  await Workspace.setPath(tmpDir)

  await SourceControl.show()

  const decoration = Locator('.SourceControlItems .DecorationIcon[src*="status-added.svg"]')
  await expect(decoration).toHaveCount(1)
  await expect(decoration).toHaveAttribute('title', 'Added')
}
