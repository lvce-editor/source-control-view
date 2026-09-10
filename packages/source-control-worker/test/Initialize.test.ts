import { expect, jest, test } from '@jest/globals'
import { ExtensionHost, ExtensionManagementWorker, RendererWorker, TextMeasurementWorker } from '@lvce-editor/rpc-registry'
import { initialize } from '../src/parts/Initialize/Initialize.ts'

test('initialize should set ExtensionManagementWorker, ExtensionHost and TextMeasurementWorker RPCs', async (): Promise<void> => {
  const sendTextMeasurementPort = jest.fn(async (): Promise<void> => {})
  const commandMap = {
    'SendMessagePortToExtensionHostWorker.sendMessagePortToExtensionManagementWorker': async (): Promise<void> => {},
    'SendMessagePortToExtensionHostWorker.sendMessagePortToTextMeasurementWorker': sendTextMeasurementPort,
  }
  RendererWorker.registerMockRpc(commandMap)

  await initialize()

  expect(sendTextMeasurementPort).not.toHaveBeenCalled()
  expect(typeof ExtensionManagementWorker.invoke).toBe('function')
  expect(typeof ExtensionHost.invoke).toBe('function')
  expect(typeof TextMeasurementWorker.invoke).toBe('function')
})
