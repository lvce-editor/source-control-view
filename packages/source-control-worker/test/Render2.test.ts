import { expect, jest, test } from '@jest/globals'
import { createMockRpc } from '@lvce-editor/rpc'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as DiffType from '../src/parts/DiffType/DiffType.ts'
import * as Render2 from '../src/parts/Render2/Render2.ts'
import * as RendererProcess from '../src/parts/RendererProcess/RendererProcess.ts'
import * as SourceControlStates from '../src/parts/SourceControlStates/SourceControlStates.ts'

test('render2 returns renderer commands when no direct renderer is connected', async () => {
  const uid = 1
  const oldState = createDefaultState()
  const newState = { ...oldState, id: uid, inputValue: 'message' }
  SourceControlStates.set(uid, oldState, newState)

  await expect(Render2.render2(uid, [DiffType.RenderValue])).resolves.toEqual([['Viewlet.setValueByName', uid, 'SourceControlInput', 'message']])
})

test('render2 queues renderer commands and returns a lightweight commit marker', async () => {
  const queueCommands = jest.fn((_uid: number, _commands: readonly unknown[]) => 17)
  RendererProcess.set(createMockRpc({ commandMap: { 'Viewlet.queueCommands': queueCommands } }))
  const uid = 2
  const oldState = createDefaultState()
  const newState = { ...oldState, id: uid, inputValue: 'message' }
  SourceControlStates.set(uid, oldState, newState)

  const result = await Render2.render2(uid, [DiffType.RenderValue])

  expect(queueCommands).toHaveBeenCalledWith(uid, [['Viewlet.setValueByName', uid, 'SourceControlInput', 'message']])
  expect(result).toEqual([['Viewlet.commitPending', uid, 17]])
})

test('render2 leaves focus context management with the renderer worker', async () => {
  const queueCommands = jest.fn((_uid: number, _commands: readonly unknown[]) => 23)
  RendererProcess.set(createMockRpc({ commandMap: { 'Viewlet.queueCommands': queueCommands } }))
  const uid = 3
  const oldState = createDefaultState()
  const newState = { ...oldState, focus: 5, id: uid }
  SourceControlStates.set(uid, oldState, newState)

  const result = await Render2.render2(uid, [DiffType.RenderFocusContext])

  expect(queueCommands).toHaveBeenCalledWith(uid, [])
  expect(result).toEqual([
    ['Viewlet.setFocusContext', uid, 5],
    ['Viewlet.commitPending', uid, 23],
  ])
})
