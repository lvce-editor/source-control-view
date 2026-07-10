import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'source-control.commit-disabled'

export const test: Test = async ({ expect, Extension, FileSystem, Locator, SourceControl, Workspace }) => {
  // arrange
  const uri = import.meta.resolve('../fixtures/sample-source-control-provider')
  await Extension.addWebExtension(uri)
  const tmpDir = await FileSystem.getTmpDir()
  await Workspace.setPath(tmpDir)

  // act
  await SourceControl.show()

  // assert
  const commitButton = Locator('.SplitButtonContent[name="Commit"]')
  await expect(commitButton).toBeVisible()
  await expect(commitButton).toHaveAttribute('aria-disabled', 'true')
  await expect(commitButton).toHaveAttribute('tabindex', '-1')
}
