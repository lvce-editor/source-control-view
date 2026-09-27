import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'source-control.stage-error'

export const test: Test = async ({ expect, Extension, FileSystem, Locator, SourceControl, Workspace }) => {
  // arrange
  const uri = import.meta.resolve('../fixtures/sample-source-control-provider-stage-error')
  await Extension.addWebExtension(uri)
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/test.css`, `abc`)
  await Workspace.setUri(tmpDir)
  await SourceControl.show()
  const treeItems = Locator('.SourceControlItems .TreeItem')
  const initialGroup = treeItems.nth(0)
  const initialFile = treeItems.nth(1)
  await expect(treeItems).toHaveCount(2)
  await expect(initialGroup).toHaveText('Changes1')
  await expect(initialFile).toHaveText('test.css')

  // act
  try {
    await SourceControl.handleClickSourceControlButtons(1, `Stage`)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    if (errorMessage !== 'Provider failed to stage test.css') {
      throw error
    }
  }

  // assert
  const sourceControlView = Locator('.Viewlet.SourceControl')
  const changesGroup = treeItems.nth(0)
  const fileItem = treeItems.nth(1)
  const progress = Locator('.Viewlet.SourceControl > .ProgressContainer')
  const input = Locator('.SourceControl .InputBox')
  await expect(sourceControlView).toBeVisible()
  await expect(treeItems).toHaveCount(2)
  await expect(changesGroup).toHaveText('Changes1')
  await expect(fileItem).toHaveText('test.css')
  await expect(progress).toHaveCount(0)

  await SourceControl.handleInput('still usable')
  await expect(input).toHaveValue('still usable')
}
