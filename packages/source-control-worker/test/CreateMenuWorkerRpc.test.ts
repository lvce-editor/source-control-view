import { expect, jest, test } from '@jest/globals'
import { type Rpc, PlainMessagePortRpcParent } from '@lvce-editor/rpc'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import { createMenuWorkerRpc } from '../src/parts/CreateMenuWorkerRpc/CreateMenuWorkerRpc.ts'

test('connects lazily and shares the connection between concurrent requests', async (): Promise<void> => {
  let workerRpc: Rpc | undefined
  const show = jest.fn(async (): Promise<void> => {})
  const sendPort = jest.fn(async (port: any): Promise<void> => {
    workerRpc = await PlainMessagePortRpcParent.create({
      commandMap: { 'Menu.show2': show },
      messagePort: port,
    })
  })
  RendererWorker.registerMockRpc({
    'SendMessagePortToExtensionHostWorker.sendMessagePortToMenuWorker': sendPort,
  })

  const rpc = await createMenuWorkerRpc()

  expect(sendPort).not.toHaveBeenCalled()
  try {
    const args = { index: 0, menuId: 17, uri: '/test.ts' }
    await Promise.all([rpc.invoke('Menu.show2', 1, 17, 2, 3, args), rpc.invoke('Menu.show2', 2, 17, 4, 5, args)])
    await rpc.invoke('Menu.show2', 3, 17, 6, 7, args)
    expect(sendPort).toHaveBeenCalledTimes(1)
    expect(show.mock.calls).toEqual([
      [1, 17, 2, 3, args],
      [2, 17, 4, 5, args],
      [3, 17, 6, 7, args],
    ])
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
    'SendMessagePortToExtensionHostWorker.sendMessagePortToMenuWorker': sendPort,
  })

  const rpc = await createMenuWorkerRpc()

  expect(sendPort).not.toHaveBeenCalled()
  await expect(rpc.invoke('Menu.show2', 'hello')).rejects.toThrow('Failed to send message port')
  expect(sendPort).toHaveBeenCalledTimes(1)
})
