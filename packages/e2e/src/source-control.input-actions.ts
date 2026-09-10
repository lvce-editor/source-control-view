import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'source-control.input-actions'

export const test: Test = async ({ ComponentState, expect, Extension, FileSystem, Locator, SourceControl, Workspace }) => {
  // arrange
  await Extension.addWebExtension(import.meta.resolve('../fixtures/sample-source-control-provider'))
  await Extension.addWebExtension(import.meta.resolve('../fixtures/sample-input-actions'))
  const tmpDir = await FileSystem.getTmpDir()
  await Workspace.setPath(tmpDir)
  await SourceControl.show()
  const input = Locator('.SourceControl textarea')
  const action = Locator('.ViewSourceControlInput button[title="Suggest Message"]')
  await expect(action).toBeVisible()
  await expect(action.locator('.MaskIconDebugAlt2')).toBeVisible()
  await SourceControl.handleInput('My change')
  await expect(input).toHaveValue('My change')

  // act
  // eslint-disable-next-line e2e/no-direct-click -- Verify the contributed button event reaches its extension command.
  await action.click()

  // assert
  try {
    await expect(input).toHaveValue('Suggested: My change')
  } catch (error) {
    const component = await ComponentState.getComponent('Source Control')
    const { inputDiagnostics, inputMessage, inputValue } = await ComponentState.getState<{ inputDiagnostics: unknown; inputValue: string; inputMessage: string }>(
      component.uid,
    )
    throw new Error(`[DEBUG-input-actions] ${JSON.stringify({ inputDiagnostics, inputMessage, inputValue })}`, { cause: error })
  }
}
