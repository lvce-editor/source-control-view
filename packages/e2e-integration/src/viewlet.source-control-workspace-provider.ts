import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'viewlet.source-control-workspace-provider'

const trailingSlash = /\/$/

export const test: Test = async ({ ActivityBar, Command, expect, Extension, Locator, QuickPick, SourceControl, Workspace }) => {
  await Workspace.close()
  const extensionUri = new URL('../fixtures/sample.source-control-workspace', import.meta.url).href.replace(trailingSlash, '')
  await Extension.addWebExtension(extensionUri)
  await ActivityBar.handleExtensionsChanged()
  await Command.execute('ExtensionManagement.activateByEvent', 'onSourceControl:memfs', '', 0)
  await Command.execute('Layout.handleExtensionsChanged')
  await SourceControl.show()

  const message = Locator('.Viewlet.SourceControl .WelcomeMessage')
  await expect(message).toHaveText('You have not yet opened a folder.')
  await Command.execute('RecentlyOpened.addToRecentlyOpened', 'memfs:///first-workspace')
  await Command.execute('QuickPick.showRecent')
  await QuickPick.selectIndex(0)

  const rows = Locator('.Viewlet.SourceControl .TreeItem')
  await expect(rows).toHaveCount(2)
  await expect(rows.nth(0)).toHaveText('memfs:///first-workspace1')
  await expect(rows.nth(1).locator('.Label')).toHaveText('first.txt')

  await Workspace.setUri('memfs:///second-workspace')
  await expect(rows).toHaveCount(2)
  await expect(rows.nth(0)).toHaveText('memfs:///second-workspace1')
  await expect(rows.nth(1).locator('.Label')).toHaveText('second.txt')

  await Workspace.close()
  try {
    await expect(message).toHaveText('You have not yet opened a folder.')
    await expect(rows).toHaveCount(0)
  } catch (error) {
    try {
      const [workspace, dirtyTabs] = await Promise.all([Command.execute('Workspace.getUri'), Command.execute('Main.hasDirtyTabs')])
      console.error('Source Control workspace-close state', JSON.stringify({ dirtyTabs, workspace }))
    } catch {
      // Preserve the original failed assertion if diagnostics are unavailable.
    }
    throw error
  }
}
