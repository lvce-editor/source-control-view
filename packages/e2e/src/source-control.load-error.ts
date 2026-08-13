import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'source-control.load-error'

export const test: Test = async ({ expect, Extension, FileSystem, Locator, SourceControl, Workspace }) => {
  // arrange
  const uri = import.meta.resolve('../fixtures/sample-source-control-provider-load-error')
  await Extension.addWebExtension(uri)
  const tmpDir = await FileSystem.getTmpDir()
  await Workspace.setPath(tmpDir)

  // act
  await SourceControl.show()

  // assert
  const message = Locator('.Viewlet.SourceControl > .Message')
  await expect(message).toBeVisible()
  await expect(message).toContainText('Unable to read repository state')
  const progress = Locator('.Viewlet.SourceControl > .ProgressContainer')
  await expect(progress).toHaveCount(0)
}
