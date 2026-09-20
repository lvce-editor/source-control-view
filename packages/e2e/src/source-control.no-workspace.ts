import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'source-control.no-workspace'

export const test: Test = async ({ expect, Locator, SourceControl, Workspace }) => {
  // arrange
  await Workspace.close()

  // act
  await SourceControl.show()

  // assert
  const message = Locator('.Viewlet.SourceControl > .Message')
  await expect(message).toBeVisible()
  await expect(message).toHaveText('No workspace is open.')
}
