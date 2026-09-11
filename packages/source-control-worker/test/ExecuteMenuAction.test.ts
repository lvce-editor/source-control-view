import { expect, test } from '@jest/globals'
import { DirentType } from '@lvce-editor/constants'
import { ExtensionManagementWorker, RendererWorker } from '@lvce-editor/rpc-registry'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { executeMenuAction } from '../src/parts/ExecuteMenuAction/ExecuteMenuAction.ts'
import { withApplicationRouting } from './test-util/WithApplicationRouting.ts'

const item = {
  badgeCount: 0,
  decorationIcon: '',
  decorationIconTitle: '',
  decorationStrikeThrough: false,
  detail: '',
  file: 'test.css',
  groupId: 'working-tree',
  icon: '',
  label: 'test.css',
  posInSet: 1,
  setSize: 1,
  type: DirentType.File,
}

test('extension menu actions execute in their application and preserve input on refresh', async () => {
  using rpc = ExtensionManagementWorker.registerMockRpc(withApplicationRouting({ 'Extensions.invokeForApplication': async (): Promise<void> => {} }))
  using _renderer = RendererWorker.registerMockRpc({ 'IconTheme.getIcons': async (): Promise<readonly string[]> => [] })
  const state = {
    ...createDefaultState(),
    actionsCache: { 'working-tree-item': [{ command: 'sample.stage', icon: '', label: 'Stage' }] },
    applicationId: 'preview',
    inputValue: 'keep my commit message',
    items: [item],
  }
  const result = await executeMenuAction(state, 'test.css', 'working-tree', 'sample.stage')
  expect(rpc.invocations).toEqual([
    ['Extensions.invokeForApplication', 'preview', 'Extensions.activateByEvent', 'onCommand:sample.stage'],
    ['Extensions.invokeForApplication', 'preview', 'Extensions.executeCommand', 'sample.stage', 'test.css'],
  ])
  expect(result.inputValue).toBe('keep my commit message')
})

test('stale menu actions and commands without contributions do not execute', async () => {
  const state = { ...createDefaultState(), items: [item] }
  expect(await executeMenuAction(state, 'missing.css', 'working-tree', 'sample.stage')).toBe(state)
  expect(await executeMenuAction(state, 'test.css', 'working-tree', 'unknown.command')).toBe(state)
})
