import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'viewlet.source-control-workspace-change'

export const test: Test = async ({ Command, expect, Locator, QuickPick, SourceControl, Workspace }) => {
  await Workspace.close()
  await SourceControl.show()

  const noWorkspaceMessage = Locator('.Viewlet.SourceControl > .Message')
  await expect(noWorkspaceMessage).toHaveText('No workspace is open.')

  await Command.execute('RecentlyOpened.addToRecentlyOpened', 'memfs:///first-workspace')
  await Command.execute('QuickPick.showRecent')
  await QuickPick.selectIndex(0)
  await expect(noWorkspaceMessage).toHaveText('No source control provider is available for this workspace.')
  const firstWorkspaceUri = await Command.execute('Workspace.getUri')
  if (firstWorkspaceUri !== 'memfs:///first-workspace') throw new Error(`Unexpected workspace URI: ${firstWorkspaceUri}`)
  await expect(noWorkspaceMessage).toHaveText('No source control provider is available for this workspace.')

  await Workspace.setUri('memfs:///second-workspace')
  const secondWorkspaceUri = await Command.execute('Workspace.getUri')
  if (secondWorkspaceUri !== 'memfs:///second-workspace') throw new Error(`Unexpected workspace URI: ${secondWorkspaceUri}`)
  await expect(noWorkspaceMessage).toHaveText('No source control provider is available for this workspace.')

  await Workspace.close()
  await expect(noWorkspaceMessage).toHaveText('No workspace is open.')

  await Command.execute('SideBar.show', 'Explorer', true)
  await Workspace.setUri('memfs:///third-workspace')
  await SourceControl.show()
  await expect(noWorkspaceMessage).toHaveText('No source control provider is available for this workspace.')
}
