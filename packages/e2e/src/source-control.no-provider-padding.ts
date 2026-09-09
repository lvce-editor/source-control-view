import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'source-control.no-provider-padding'

export const test: Test = async ({ expect, Locator, SourceControl }) => {
  // arrange
  // The default test environment has no source control extensions installed.

  // act
  await SourceControl.show()
  await new Promise((resolve) => setTimeout(resolve, 2000))

  // assert
  const message = Locator('.Viewlet.SourceControl > .Message')
  await expect(message).toBeVisible()
  await expect(message).toHaveText('No source control extensions are installed.')
  await expect(message).toHaveCSS('padding-left', '20px')
  await expect(message).toHaveCSS('padding-right', '20px')
}
