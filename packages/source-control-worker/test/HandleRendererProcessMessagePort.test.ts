import { expect, jest, test } from '@jest/globals'
import { createMockRpc, PlainMessagePortRpcParent } from '@lvce-editor/rpc'
import { RendererProcess, RendererWorker } from '@lvce-editor/rpc-registry'
import {
  handleRendererProcessMessagePort,
  setCommandMap,
} from '../src/parts/HandleRendererProcessMessagePort/HandleRendererProcessMessagePort.ts'

test('handleRendererProcessMessagePort connects the source control worker to the renderer process', async () => {
  const queueCommands = jest.fn((_uid: number, _commands: readonly unknown[]) => 31)
  // @ts-ignore
  const { port1, port2 } = new MessageChannel()
  const rendererProcessRpc = await PlainMessagePortRpcParent.create({
    commandMap: {
      'Viewlet.queueCommands': queueCommands,
    },
    messagePort: port1,
  })

  await handleRendererProcessMessagePort(port2)
  await expect(RendererProcess.invoke('Viewlet.queueCommands', 7, [['Viewlet.setDom2', 7, []]])).resolves.toBe(31)
  expect(queueCommands).toHaveBeenCalledWith(7, [['Viewlet.setDom2', 7, []]])

  const requestRender = jest.fn(async (_uid: number) => {})
  RendererWorker.set(Object.assign(createMockRpc({ commandMap: { 'Viewlet.requestRender': requestRender } }), { dispose: jest.fn() }))
  const handleInput = jest.fn(async (_uid: number, _value: string) => {})
  setCommandMap({ 'SourceControl.handleInput': handleInput })
  await rendererProcessRpc.invoke('Viewlet.executeViewletCommand', 7, 'handleInput', 'hello')
  expect(handleInput).toHaveBeenCalledWith(7, 'hello')
  expect(requestRender).toHaveBeenCalledWith(7)
  await expect(rendererProcessRpc.invoke('Viewlet.executeViewletCommand', 7, 'missing')).rejects.toThrow('Viewlet command not found: missing')

  await RendererProcess.dispose()
  await RendererWorker.dispose()
  await rendererProcessRpc.dispose()
})
