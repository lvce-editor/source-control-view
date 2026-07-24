import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'source-control.disabled-provider-message'

export const test: Test = async ({ expect, Extension, Locator, SourceControl }) => {
  // arrange
  const uri = import.meta.resolve('../fixtures/sample-disabled-source-control-provider')
  await Extension.addWebExtension(uri)

  // act
  await SourceControl.show()

  // assert
  const message = Locator('.Viewlet.SourceControl > .Message')
  await expect(message).toBeVisible()
  await expect(message).toHaveText('All installed source control extensions are disabled.')
}
