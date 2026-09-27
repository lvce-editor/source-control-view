import { expect, test } from '@jest/globals'
import { ExtensionHost, ExtensionManagementWorker, IconThemeWorker } from '@lvce-editor/rpc-registry'
import type { SourceControlState } from '../src/parts/SourceControlState/SourceControlState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as Refresh from '../src/parts/Refresh/Refresh.ts'
import { withApplicationRouting } from './test-util/WithApplicationRouting.ts'

test('refresh should update state with groups and visible items', async (): Promise<void> => {
  const parentCommandMap = {
    'IconTheme.getIcons': async (): Promise<readonly string[]> => [],
  }
  IconThemeWorker.registerMockRpc(parentCommandMap)

  const commandMap = {
    'ExtensionHostSourceControl.getGroups': async (): Promise<{ allGroups: never[]; gitRoot: string }> => ({
      allGroups: [],
      gitRoot: '/test',
    }),
  }
  using mockRpc = ExtensionHost.registerMockRpc(commandMap)

  const state: SourceControlState = createDefaultState()
  const result = await Refresh.refresh(state)
  expect(result).toEqual({
    ...state,
    allGroups: [],
    finalDeltaY: 0,
    gitRoot: '',
    inputPlaceholder: 'Message (Enter) to commit',
    items: [],
    maxLineY: 0,
    scrollBarHeight: 0,
    visibleItems: [],
  })
  expect(mockRpc.invocations).toEqual([])
})

test('refresh updates the placeholder when only the current branch changes', async (): Promise<void> => {
  using iconRpc = IconThemeWorker.registerMockRpc({
    'IconTheme.getIcons': async (): Promise<readonly string[]> => [],
  })
  using _extensionManagementRpc = ExtensionManagementWorker.registerMockRpc(
    withApplicationRouting({
      'Extensions.activateByEvent': async (): Promise<void> => {},
    }),
  )
  using extensionRpc = ExtensionHost.registerMockRpc({
    'ExtensionHostSourceControl.getBadgeCount': async (): Promise<number> => 0,
    'ExtensionHostSourceControl.getCurrentBranch': async (): Promise<string> => 'feature/test',
    'ExtensionHostSourceControl.getGroups': async (): Promise<readonly never[]> => [],
    'ExtensionHostSourceControl.getProgress': async (): Promise<boolean> => false,
  })

  const result = await Refresh.refresh({
    ...createDefaultState(),
    enabledProviderIds: ['git'],
    inputPlaceholder: "Message (Enter) to commit on 'main'",
  })

  expect(result.inputPlaceholder).toBe("Message (Enter) to commit on 'feature/test'")
  expect(extensionRpc.invocations).toContainEqual(['ExtensionHostSourceControl.getCurrentBranch', 'git', '/'])
  expect(iconRpc.invocations).toEqual([])
})

test('refresh - should not request icons for group headers', async (): Promise<void> => {
  using iconRpc = IconThemeWorker.registerMockRpc({
    'IconTheme.getIcons': async (): Promise<readonly string[]> => ['file-icon'],
  })
  using _extensionManagementRpc = ExtensionManagementWorker.registerMockRpc(
    withApplicationRouting({
      'Extensions.activateByEvent': async (): Promise<void> => {},
    }),
  )
  using _extensionHostRpc = ExtensionHost.registerMockRpc({
    'ExtensionHostSourceControl.getBadgeCount': async (): Promise<number> => 1,
    'ExtensionHostSourceControl.getGroups': async (): Promise<readonly any[]> => [
      {
        id: 'group',
        items: [
          {
            file: '/test/file1.ts',
            icon: '',
            iconTitle: '',
            strikeThrough: false,
          },
        ],
        label: 'Changes',
      },
    ],
    'ExtensionHostSourceControl.getProgress': async (): Promise<boolean> => false,
  })
  const state: SourceControlState = {
    ...createDefaultState(),
    enabledProviderIds: ['git'],
  }

  const result = await Refresh.refresh(state)

  expect(result.fileIconCache).toEqual({ '/test/file1.ts': 'file-icon' })
  expect(result.fileIconCache).not.toHaveProperty('Changes')
  expect(result.items.map((item) => item.label)).toEqual(['Changes', 'file1.ts'])
  expect(iconRpc.invocations).toEqual([['IconTheme.getIcons', [{ name: 'file1.ts', path: '/test/file1.ts', type: 1 }]]])
})
