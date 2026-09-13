import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'source-control.operation-progress'
// Enable after the server includes the renderer notification route and the released provider API.
export const skip = 1

export const test: Test = async ({ Command, expect, Extension, FileSystem, Locator, SourceControl, Workspace }) => {
  await Extension.addWebExtension(import.meta.resolve('../fixtures/sample-source-control-progress'))
  await Workspace.setPath(await FileSystem.getTmpDir())
  await SourceControl.show()
  const progress = Locator('.Viewlet.SourceControl > .ProgressContainer')
  await expect(progress).toHaveCount(0)
  await Command.execute('ExtensionHost.executeCommand', 'progress.begin')
  await expect(progress).toBeVisible()
  await expect(Locator('.Viewlet.SourceControl textarea')).toBeVisible()
  await Command.execute('ExtensionHost.executeCommand', 'progress.finish')
  await expect(progress).toHaveCount(0)
}
