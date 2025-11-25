import { expect, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as CommandMap from '../src/parts/CommandMap/CommandMap.ts'
import * as Listen from '../src/parts/Listen/Listen.ts'
import { getCommandIds } from '../src/parts/SourceControlStates/SourceControlStates.ts'

test('listen - registers commands with command map', async (): Promise<void> => {
  const mockRpc = MockRpc.create({
    commandMap: CommandMap.commandMap,
    invoke: (method: string) => {
      throw new Error(`unexpected method ${method}`)
    },
  })
  RendererWorker.set(mockRpc)
  await expect(Listen.listen()).rejects.toThrow()
  const commandIds = getCommandIds()
  expect(commandIds.length).toBeGreaterThan(0)
})

test('listen - attempts to create and set RPC client', async (): Promise<void> => {
  const mockRpc = MockRpc.create({
    commandMap: CommandMap.commandMap,
    invoke: (method: string) => {
      throw new Error(`unexpected method ${method}`)
    },
  })
  RendererWorker.set(mockRpc)
  await expect(Listen.listen()).rejects.toThrow()
  const commandIds = getCommandIds()
  expect(commandIds.length).toBeGreaterThan(0)
})
