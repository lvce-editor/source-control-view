import { expect, jest, test } from '@jest/globals'
import { type Rpc, PlainMessagePortRpcParent } from '@lvce-editor/rpc'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import { createTextMeasurementWorkerRpc } from '../src/parts/CreateTextMeasurementWorkerRpc/CreateTextMeasurementWorkerRpc.ts'

test('connects lazily and shares the connection between concurrent measurements', async (): Promise<void> => {
  let workerRpc: Rpc | undefined
  const measure = jest.fn((text: string): number => text.length)
  const sendPort = jest.fn(async (port: any): Promise<void> => {
    workerRpc = await PlainMessagePortRpcParent.create({
      commandMap: { 'TextMeasurement.measure': measure },
      messagePort: port,
    })
  })
  RendererWorker.registerMockRpc({
    'SendMessagePortToExtensionHostWorker.sendMessagePortToTextMeasurementWorker': sendPort,
  })

  const rpc = await createTextMeasurementWorkerRpc()

  expect(sendPort).not.toHaveBeenCalled()
  try {
    await expect(Promise.all([rpc.invoke('TextMeasurement.measure', 'hello'), rpc.invoke('TextMeasurement.measure', 'world!')])).resolves.toEqual([5, 6])
    await expect(rpc.invoke('TextMeasurement.measure', 'again')).resolves.toBe(5)
    expect(sendPort).toHaveBeenCalledTimes(1)
    expect(measure).toHaveBeenCalledTimes(3)
  } finally {
    await rpc.dispose()
    await workerRpc?.dispose()
  }
})

test('defers connection failures until the first invocation', async (): Promise<void> => {
  const sendPort = jest.fn(async (port: any): Promise<void> => {
    port.close()
    throw new Error('Failed to send message port')
  })
  RendererWorker.registerMockRpc({
    'SendMessagePortToExtensionHostWorker.sendMessagePortToTextMeasurementWorker': sendPort,
  })

  const rpc = await createTextMeasurementWorkerRpc()

  expect(sendPort).not.toHaveBeenCalled()
  await expect(rpc.invoke('TextMeasurement.measure', 'hello')).rejects.toThrow('Failed to send message port')
  expect(sendPort).toHaveBeenCalledTimes(1)
})
