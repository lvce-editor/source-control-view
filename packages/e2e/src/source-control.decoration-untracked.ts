import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'source-control.decoration-untracked'

export const test: Test = async ({ expect, Extension, FileSystem, Locator, SourceControl, Workspace }) => {
  // arrange
  const uri = import.meta.resolve('../fixtures/sample-source-control-provider')
  await Extension.addWebExtension(uri)
  const tmpDir = await FileSystem.getTmpDir()
  const file = `${tmpDir}/untracked.css`
  await FileSystem.writeFile(file, 'untracked')
  await Workspace.setPath(tmpDir)

  // act
  await SourceControl.show()
  await new Promise((resolve) => setTimeout(resolve, 2000))

  // assert
  const decoration = Locator('.SourceControlItems .DecorationIcon')
  await expect(decoration).toHaveCount(1)
  await expect(decoration).toHaveAttribute('title', 'Untracked')
  const nonCanonicalDecoration = Locator('.SourceControlItems .DecorationIcon[src*="/./"]')
  await expect(nonCanonicalDecoration).toHaveCount(0)
}
