import { expect, test } from '@jest/globals'
import { InputSource } from '@lvce-editor/constants'
import { ExtensionHost, ExtensionManagementWorker, TextMeasurementWorker } from '@lvce-editor/rpc-registry'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleInputActionClick } from '../src/parts/HandleInputActionClick/HandleInputActionClick.ts'
import { withApplicationRouting } from './test-util/WithApplicationRouting.ts'

const state = {
  ...createDefaultState(),
  inputActions: [
    { command: 'first.suggest', icon: 'Check', label: 'Suggest' },
    { command: 'second.suggest', icon: 'Add', label: 'Suggest' },
  ],
  inputValue: 'original',
}

test('executes the selected command even when labels match and replaces the message', async () => {
  using host = ExtensionHost.registerMockRpc({ 'Extensions.executeCommand': async () => 'generated' })
  using _activation = ExtensionManagementWorker.registerMockRpc(withApplicationRouting({ 'Extensions.activateByEvent': async () => {} }))
  using _measurement = TextMeasurementWorker.registerMockRpc({ 'TextMeasurement.measureTextBlockHeight': async () => 40 })
  const result = await handleInputActionClick(state, '1')
  expect(host.invocations).toEqual([['Extensions.executeCommand', 'second.suggest', 'original']])
  expect(result.inputValue).toBe('generated')
  expect(result.inputSource).toBe(InputSource.Script)
})

test('preserves the message for a command with no string result', async () => {
  using _host = ExtensionHost.registerMockRpc({ 'Extensions.executeCommand': async () => undefined })
  using _activation = ExtensionManagementWorker.registerMockRpc(withApplicationRouting({ 'Extensions.activateByEvent': async () => {} }))
  expect(await handleInputActionClick(state, '0')).toBe(state)
})

test('preserves the message and displays command errors', async () => {
  using _host = ExtensionHost.registerMockRpc({
    'Extensions.executeCommand': async () => {
      throw new Error('Offline')
    },
  })
  using _activation = ExtensionManagementWorker.registerMockRpc(withApplicationRouting({ 'Extensions.activateByEvent': async () => {} }))
  const result = await handleInputActionClick(state, '0')
  expect(result.inputValue).toBe('original')
  expect(result.inputMessage).toBe('Offline')
})

test.each(['', '-1', '1.5', '99', 'suggest'])('ignores invalid action %s', async (name) => {
  expect(await handleInputActionClick(state, name)).toBe(state)
})
