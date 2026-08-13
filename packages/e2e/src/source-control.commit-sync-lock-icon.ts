import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'source-control.commit-sync-lock-icon'

export const skip = 1

export const test: Test = async ({ expect, Extension, FileSystem, Locator, SourceControl, Workspace }) => {
  // arrange
  const uri = import.meta.resolve('../fixtures/sample-source-control-provider')
  await Extension.addWebExtension(uri)
  const tmpDir = await FileSystem.getTmpDir()
  await Workspace.setPath(tmpDir)

  // act
  await SourceControl.show()

  // assert
  const lockIcon = Locator('.SplitButtonContent[name="Commit & Sync"] .MaskIconLock')
  await expect(lockIcon).toHaveCount(1)
}
