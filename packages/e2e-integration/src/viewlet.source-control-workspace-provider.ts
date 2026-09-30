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

  const message = Locator('.Viewlet.SourceControl > .Message')
  await expect(message).toHaveText('No workspace is open.')
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
  await expect(message).toHaveText('No workspace is open.')
  await expect(rows).toHaveCount(0)
}
