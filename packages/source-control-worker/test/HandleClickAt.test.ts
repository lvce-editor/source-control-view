import { expect, test } from '@jest/globals'
import { IconThemeWorker, RendererWorker as ParentRpc, ExtensionHost, ExtensionManagementWorker } from '@lvce-editor/rpc-registry'
import type { SourceControlState } from '../src/parts/SourceControlState/SourceControlState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleClickAt } from '../src/parts/HandleClickAt/HandleClickAt.ts'
import { withApplicationRouting } from './test-util/WithApplicationRouting.ts'

test('handleClickAt - with name', async () => {
  const state: SourceControlState = createDefaultState()
  const result = await handleClickAt(state, 100, 100, 'test')
  expect(result).toBeDefined()
})

test('handleClickAt - without name', async () => {
  const state: SourceControlState = createDefaultState()
  const result = await handleClickAt(state, 100, 100, '')
  expect(result).toBeDefined()
})

test('handleClickAt - dispatches a file button by target name', async () => {
  const parentCommandMap = {
    'Extensions.activateByEvent': async (): Promise<void> => {},
    'IconTheme.getIcons': async (): Promise<readonly string[]> => [],
  }
  ExtensionManagementWorker.registerMockRpc(withApplicationRouting(parentCommandMap))
  IconThemeWorker.registerMockRpc(parentCommandMap)
  ParentRpc.registerMockRpc(parentCommandMap)
  const extensionHostMockRpc = ExtensionHost.registerMockRpc({
    'ExtensionHostSourceControl.getGroups': async (): Promise<{ allGroups: never[]; gitRoot: string }> => ({
      allGroups: [],
      gitRoot: '/test',
    }),
    'Extensions.executeCommand': async (): Promise<void> => {},
  })

  const state: SourceControlState = {
    ...createDefaultState(),
    visibleItems: [
      {
        badgeCount: 0,
        buttons: [{ command: 'sample.stage', icon: 'Add', label: 'Stage' }],
        decorationIcon: '',
        decorationIconTitle: '',
        decorationStrikeThrough: false,
        detail: '',
        file: 'test.css',
        fileIcon: '',
        groupId: 'working-tree',
        icon: '',
        indent: 0,
        label: 'test.css',
        posInSet: 1,
        setSize: 1,
        type: 0,
      },
    ],
  }

  await handleClickAt(state, 100, 50, 'Stage')

  expect(extensionHostMockRpc.invocations).toContainEqual(['Extensions.executeCommand', 'sample.stage', 'test.css'])
})
