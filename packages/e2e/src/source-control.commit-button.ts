import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'source-control.commit-button'

export const test: Test = async ({ expect, Extension, FileSystem, Locator, SourceControl, Workspace }) => {
  const uri = import.meta.resolve('../fixtures/sample-source-control-provider')
  await Extension.addWebExtension(uri)
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/test.css`, 'abc')
  await Workspace.setPath(tmpDir)

  await SourceControl.show()

  const button = Locator('.SourceControl .SplitButtonContent[name="Commit"]')
  await expect(button).toBeVisible()
  await expect(button).toHaveAttribute('aria-disabled', 'false')
  await expect(button).toHaveAttribute('tabindex', '0')
  await expect(button).toHaveAttribute('title', 'sampleSourceControl.commit')
}
