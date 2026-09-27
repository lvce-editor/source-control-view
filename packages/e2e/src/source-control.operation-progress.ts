import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'source-control.operation-progress'
export const test: Test = async ({ Command, expect, Extension, FileSystem, Locator, SourceControl, Workspace }) => {
  await Extension.addWebExtension(import.meta.resolve('../fixtures/sample-source-control-progress'))
  await Workspace.setUri(await FileSystem.getTmpDir())
  await SourceControl.show()
  const progress = Locator('.Viewlet.SourceControl > .ProgressContainer')
  await expect(progress).toHaveCount(0)
  await Command.execute('ExtensionHost.executeCommand', 'progress.begin')
  await expect(progress).toBeVisible()
  const bar = progress.locator('.Progress')
  await expect(bar).toHaveCSS('animation-name', 'progress')
  await expect(bar).toHaveCSS('animation-duration', '4s')
  const input = Locator('.Viewlet.SourceControl textarea')
  await expect(input).toBeVisible()
  await Command.execute('SideBar.show', 'Explorer')
  await SourceControl.show()
  await expect(progress).toBeVisible()
  await expect(input).toBeVisible()
  await Command.execute('ExtensionHost.executeCommand', 'progress.finish')
  await expect(progress).toHaveCount(0)
}
