import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'source-control.history'

export const test: Test = async ({ Command, expect, Extension, FileSystem, KeyBoard, Locator, SourceControl, Workspace }) => {
  await Extension.addWebExtension(import.meta.resolve('../fixtures/sample-source-control-provider'))
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/test.css`, 'content')
  await Workspace.setPath(tmpDir)
  await SourceControl.show()
  await new Promise((resolve) => setTimeout(resolve, 2000))
  await SourceControl.handleClickSourceControlButtons(1, 'Stage')

  const input = Locator('.SourceControl textarea.InputBox')
  const firstMessage = '  first line\nsecond line  '
  await SourceControl.handleInput(firstMessage)
  await SourceControl.acceptInput()
  await SourceControl.handleInput('second message')
  await SourceControl.acceptInput()
  await SourceControl.handleInput('draft')
  // eslint-disable-next-line e2e/no-direct-click -- Focus the source control input before sending navigation keys.
  await input.click()

  await Command.execute('Source Control.handleFocus')

  await KeyBoard.press('ArrowUp')
  await expect(input).toHaveValue('second message')
  await KeyBoard.press('ArrowUp')
  await expect(input).toHaveValue(firstMessage)
  await KeyBoard.press('ArrowDown')
  await expect(input).toHaveValue('second message')
  await KeyBoard.press('ArrowDown')
  await expect(input).toHaveValue('draft')
}
