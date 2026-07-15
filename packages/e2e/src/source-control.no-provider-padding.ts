import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'source-control.no-provider-padding'

export const test: Test = async ({ expect, Locator, SourceControl }) => {
  // act
  await SourceControl.show()

  // assert
  const message = Locator('.Viewlet.SourceControl > .Message')
  await expect(message).toBeVisible()
  await expect(message).toHaveText('No source control provider is enabled or installed.')
  await expect(message).toHaveCSS('padding-left', '20px')
  await expect(message).toHaveCSS('padding-right', '20px')
}
