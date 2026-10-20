import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'viewlet.source-control-native-interactions'

export const test: Test = async ({ expect, Extension, FileSystem, Locator, SourceControl, Workspace }) => {
  await Extension.addWebExtension(import.meta.resolve('../fixtures/sample-source-control-provider'))
  const root = await FileSystem.getTmpDir()
  await Promise.all(Array.from({ length: 100 }, (_, index) => FileSystem.writeFile(`${root}/${index}.css`, `source-control-${index}`)))
  await Workspace.setUri(root)
  await SourceControl.show()
  await expect(Locator('.SourceControlItems .TreeItem').nth(0)).toHaveText('Changes100')
  await expect(Locator('.SourceControlItems .TreeItem').nth(1)).toHaveText('0.css')
}
