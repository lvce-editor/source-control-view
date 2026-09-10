import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'source-control.context-menu'

export const test: Test = async ({ expect, Extension, FileSystem, Locator, SourceControl, Workspace }) => {
  // arrange
  const uri = import.meta.resolve('../fixtures/sample-source-control-provider')
  await Extension.addWebExtension(uri)
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/test.css`, `abc`)
  await Workspace.setPath(tmpDir)
  await SourceControl.show()
  await new Promise((resolve) => setTimeout(resolve, 2000))

  // act
  const file = Locator('.SourceControlItems .TreeItem[title="test.css"]')
  await file.click({ button: 'right' })

  // assert
  const menu = Locator('.Menu')
  await expect(menu).toBeVisible()
  const menuItems = menu.locator('.MenuItem')
  await expect(menuItems).toHaveCount(6)
  const menuItem1 = menuItems.nth(0)
  await expect(menuItem1).toHaveText('Open Changes')
  const menuItem2 = menuItems.nth(1)
  await expect(menuItem2).toHaveText('Open File')
  const menuItem3 = menuItems.nth(2)
  await expect(menuItem3).toHaveText('Open File (HEAD)')
  const stage = menu.locator('.MenuItem', { hasText: 'Stage' })
  await stage.click()
  await expect(Locator('.SourceControlItems .TreeItem').nth(0)).toHaveText('Staged Changes1')
}
