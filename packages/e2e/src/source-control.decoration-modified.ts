import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'source-control.decoration-modified'

export const test: Test = async ({ expect, Extension, FileSystem, Locator, SourceControl, Workspace }) => {
  const uri = import.meta.resolve('../fixtures/sample-source-control-provider')
  await Extension.addWebExtension(uri)
  const tmpDir = await FileSystem.getTmpDir()
  const file = `${tmpDir}/modified.css`
  await FileSystem.writeFile(file, 'modified')
  await Workspace.setPath(tmpDir)

  await SourceControl.show()

  const decoration = Locator('.SourceControlItems .DecorationIcon')
  await expect(decoration).toHaveCount(1)
  await expect(decoration).toHaveAttribute('title', 'Modified')
}
