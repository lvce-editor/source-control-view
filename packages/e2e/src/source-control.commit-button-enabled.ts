import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'source-control.commit-button-enabled'

export const test: Test = async ({ expect, Extension, FileSystem, Locator, SourceControl, Workspace }) => {
  // arrange
  const uri = import.meta.resolve('../fixtures/sample-source-control-provider')
  await Extension.addWebExtension(uri)
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/test.css`, 'abc')
  await Workspace.setPath(tmpDir)

  // act
  await SourceControl.show()

  // assert
  const commitButton = Locator('.Viewlet.SourceControl .SplitButtonContent[name="Commit"]')
  await expect(commitButton).toBeVisible()
  await expect(commitButton).toHaveAttribute('aria-disabled', 'false')
  await expect(commitButton).toHaveAttribute('tabindex', '0')
  await expect(commitButton.locator('.MaskIconCheck')).toHaveCount(1)
}
