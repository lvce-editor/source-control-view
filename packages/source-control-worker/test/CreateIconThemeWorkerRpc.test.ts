import { expect, jest, test } from '@jest/globals'
import { type Rpc, PlainMessagePortRpcParent } from '@lvce-editor/rpc'
import { IconThemeWorker, RendererWorker } from '@lvce-editor/rpc-registry'
import { createIconThemeWorkerRpc } from '../src/parts/CreateIconThemeWorkerRpc/CreateIconThemeWorkerRpc.ts'
import { initialize } from '../src/parts/Initialize/Initialize.ts'

test('connects lazily and shares the connection between concurrent requests', async (): Promise<void> => {
  let workerRpc: Rpc | undefined
  const getIcons = jest.fn((requests: readonly { name: string }[]): readonly string[] => requests.map((request) => `${request.name}.svg`))
  const sendPort = jest.fn(async (port: any): Promise<void> => {
    workerRpc = await PlainMessagePortRpcParent.create({
      commandMap: { 'IconTheme.getIcons': getIcons },
      messagePort: port,
    })
  })
  RendererWorker.registerMockRpc({
    'SendMessagePortToExtensionHostWorker.sendMessagePortToIconThemeWorker': sendPort,
  })

  await initialize()
  const rpc = IconThemeWorker

  expect(sendPort).not.toHaveBeenCalled()
  try {
    await expect(Promise.all([rpc.getIcons([{ name: 'file.ts', type: 1 }]), rpc.getIcons([{ name: 'src', type: 2 }])])).resolves.toEqual([['file.ts.svg'], ['src.svg']])
    await expect(rpc.getIcons([{ name: 'other.ts', type: 1 }])).resolves.toEqual(['other.ts.svg'])
    expect(sendPort).toHaveBeenCalledTimes(1)
    expect(getIcons).toHaveBeenCalledTimes(3)
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
    'SendMessagePortToExtensionHostWorker.sendMessagePortToIconThemeWorker': sendPort,
  })

  const rpc = await createIconThemeWorkerRpc()

  expect(sendPort).not.toHaveBeenCalled()
  await expect(rpc.invoke('IconTheme.getIcons', 'hello')).rejects.toThrow('Failed to send message port')
  expect(sendPort).toHaveBeenCalledTimes(1)
})
