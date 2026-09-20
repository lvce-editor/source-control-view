import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'source-control.placeholder'

export const test: Test = async ({ Command, expect, Extension, FileSystem, Locator, SourceControl, Workspace }) => {
  // arrange
  const uri = import.meta.resolve('../fixtures/sample-source-control-provider')
  await Extension.addWebExtension(uri)
  const tmpDir = await FileSystem.getTmpDir()
  await Workspace.setPath(tmpDir)

  // act
  await SourceControl.show()
  await new Promise((resolve) => setTimeout(resolve, 2000))

  // assert
  const input = Locator(`.SourceControl .InputBox`)
  await expect(input).toBeVisible()
  await expect(input).toHaveAttribute(`placeholder`, `Message (Enter) to commit on 'main'`)

  await SourceControl.handleInput('typed message')
  await Command.execute('ExtensionHost.executeCommand', 'sampleSourceControl.checkout', 'feature/test')
  await Command.execute('Layout.handleWorkspaceRefresh')

  await expect(input).toHaveAttribute(`placeholder`, `Message (Enter) to commit on 'feature/test'`)
  await expect(input).toHaveValue('typed message')
}
