import { beforeAll, expect, test } from '@jest/globals'
import { ExtensionHost, ExtensionManagementWorker } from '@lvce-editor/rpc-registry'
import { RendererWorker as ParentRpc } from '@lvce-editor/rpc-registry'
import * as SourceControl from '../src/parts/SourceControl/SourceControl.ts'

beforeAll(() => {
  const commandMap = {}
  ParentRpc.registerMockRpc(commandMap)
})

test('acceptInput should call ExtensionHostSourceControl.acceptInput', async (): Promise<void> => {
  const extensionHostCommandMap = {
    'ExtensionHostSourceControl.acceptInput': async (): Promise<void> => {},
  }
  const extensionHostMockRpc = ExtensionHost.registerMockRpc(extensionHostCommandMap)

  const parentCommandMap = {
    'ExtensionHostManagement.activateByEvent': async (): Promise<void> => {},
  }
  ParentRpc.registerMockRpc(parentCommandMap)
  await SourceControl.acceptInput('test-provider', 'test-input', '/test-asset-dir', 1)
  expect(extensionHostMockRpc.invocations).toEqual([['ExtensionHostSourceControl.acceptInput', 'test-provider', 'test-input']])
})

test('generateCommitMessage should call ExtensionHostSourceControl.generateCommitMessage', async (): Promise<void> => {
  const extensionHostCommandMap = {
    'ExtensionHostSourceControl.generateCommitMessage': async (): Promise<string> => 'feat: generated',
  }
  const extensionHostMockRpc = ExtensionHost.registerMockRpc(extensionHostCommandMap)

  const parentCommandMap = {
    'ExtensionHostManagement.activateByEvent': async (): Promise<void> => {},
  }
  ParentRpc.registerMockRpc(parentCommandMap)

  const result = await SourceControl.generateCommitMessage('test-provider', '/test-asset-dir', 1)
  expect(result).toBe('feat: generated')
  expect(extensionHostMockRpc.invocations).toEqual([['ExtensionHostSourceControl.generateCommitMessage', 'test-provider']])
})

test('getShowGenerateCommitMessageButton should read provider features', async (): Promise<void> => {
  const extensionHostCommandMap = {
    'ExtensionHostSourceControl.getFeatures': async (): Promise<{ showGenerateCommitMessageButton: boolean }> => ({
      showGenerateCommitMessageButton: false,
    }),
  }
  const extensionHostMockRpc = ExtensionHost.registerMockRpc(extensionHostCommandMap)

  const parentCommandMap = {
    'ExtensionHostManagement.activateByEvent': async (): Promise<void> => {},
  }
  ParentRpc.registerMockRpc(parentCommandMap)

  const result = await SourceControl.getShowGenerateCommitMessageButton('test-provider', '/test-asset-dir', 1)
  expect(result).toBe(false)
  expect(extensionHostMockRpc.invocations).toEqual([['ExtensionHostSourceControl.getFeatures', 'test-provider']])
})

test('getShowGenerateCommitMessageButton should default to true when provider features are unavailable', async (): Promise<void> => {
  const extensionHostCommandMap = {
    'ExtensionHostSourceControl.getFeatures': async (): Promise<never> => {
      throw new Error('method not implemented')
    },
  }
  ExtensionHost.registerMockRpc(extensionHostCommandMap)

  const parentCommandMap = {
    'ExtensionHostManagement.activateByEvent': async (): Promise<void> => {},
  }
  ParentRpc.registerMockRpc(parentCommandMap)

  const result = await SourceControl.getShowGenerateCommitMessageButton('test-provider', '/test-asset-dir', 1)
  expect(result).toBe(true)
})

test('getChangedFiles should call ExtensionHostSourceControl.getChangedFiles', async (): Promise<void> => {
  const extensionHostCommandMap = {
    'ExtensionHost.sourceControlGetChangedFiles': async (): Promise<never[]> => [],
  }
  const extensionHostMockRpc = ExtensionHost.registerMockRpc(extensionHostCommandMap)

  const parentCommandMap = {
    'ExtensionHostManagement.activateByEvent': async (): Promise<void> => {},
  }
  ParentRpc.registerMockRpc(parentCommandMap)

  const result = await SourceControl.getChangedFiles('test-provider', '/test-asset-dir', 1)
  expect(result).toEqual([])
  expect(extensionHostMockRpc.invocations).toEqual([['ExtensionHost.sourceControlGetChangedFiles', 'test-provider']])
})

test('getBadgeCount should call ExtensionHostSourceControl.getBadgeCount for each provider', async (): Promise<void> => {
  const extensionHostCommandMap = {
    'ExtensionHostSourceControl.getBadgeCount': async (providerId: string): Promise<number> => (providerId === 'test-provider-1' ? 2 : 3),
  }
  const extensionHostMockRpc = ExtensionHost.registerMockRpc(extensionHostCommandMap)

  const parentCommandMap = {
    'ExtensionHostManagement.activateByEvent': async (): Promise<void> => {},
  }
  ParentRpc.registerMockRpc(parentCommandMap)

  const result = await SourceControl.getBadgeCount(['test-provider-1', 'test-provider-2'], '/test-asset-dir', 1)
  expect(result).toBe(5)
  expect(extensionHostMockRpc.invocations).toEqual([
    ['ExtensionHostSourceControl.getBadgeCount', 'test-provider-1'],
    ['ExtensionHostSourceControl.getBadgeCount', 'test-provider-2'],
  ])
})

test('getWorkspaceBadgeCount should activate providers and get badge count', async (): Promise<void> => {
  const extensionHostCommandMap = {
    'ExtensionHostSourceControl.getBadgeCount': async (): Promise<number> => 4,
    'ExtensionHostSourceControl.getEnabledProviderIds': async (): Promise<string[]> => ['test-provider'],
  }
  const extensionHostMockRpc = ExtensionHost.registerMockRpc(extensionHostCommandMap)

  const parentCommandMap = {
    'ExtensionHostManagement.activateByEvent': async (): Promise<void> => {},
  }
  ParentRpc.registerMockRpc(parentCommandMap)

  const result = await SourceControl.getWorkspaceBadgeCount('file:///test-root', '/test-asset-dir', 1)
  expect(result).toBe(4)
  expect(extensionHostMockRpc.invocations).toEqual([
    ['ExtensionHostSourceControl.getEnabledProviderIds', 'file', 'file:///test-root'],
    ['ExtensionHostSourceControl.getBadgeCount', 'test-provider'],
  ])
})

test('getFileBefore should call ExtensionHostSourceControl.getFileBefore', async (): Promise<void> => {
  const extensionHostCommandMap = {
    'ExtensionHostSourceControl.getFileBefore': async (): Promise<Record<string, never>> => ({}),
  }
  const extensionHostMockRpc = ExtensionHost.registerMockRpc(extensionHostCommandMap)

  const parentCommandMap = {
    'ExtensionHostManagement.activateByEvent': async (): Promise<void> => {},
  }
  ParentRpc.registerMockRpc(parentCommandMap)

  const result = await SourceControl.getFileBefore('test-provider', 'test-file', '/test-asset-dir', 1)
  expect(result).toEqual({})
  expect(extensionHostMockRpc.invocations).toEqual([['ExtensionHostSourceControl.getFileBefore', 'test-provider', 'test-file']])
})

test.todo('add should call ExtensionHostSourceControl.add')

test.todo('discard should call ExtensionHostSourceControl.discard')

test('getEnabledProviderIds should call ExtensionHostSourceControl.getEnabledProviderIds', async (): Promise<void> => {
  const extensionHostCommandMap = {
    'ExtensionHostSourceControl.getEnabledProviderIds': async (): Promise<string[]> => ['test-provider'],
  }
  const extensionHostMockRpc = ExtensionHost.registerMockRpc(extensionHostCommandMap)

  const parentCommandMap = {
    'ExtensionHostManagement.activateByEvent': async (): Promise<void> => {},
  }
  ParentRpc.registerMockRpc(parentCommandMap)

  const result = await SourceControl.getEnabledProviderIds('test-scheme', 'test-root', '/test-asset-dir', 1)
  expect(result).toEqual(['test-provider'])
  expect(extensionHostMockRpc.invocations).toEqual([['ExtensionHostSourceControl.getEnabledProviderIds', 'test-scheme', 'test-root']])
})

test('getGroups should call ExtensionHostSourceControl.getGroups', async (): Promise<void> => {
  const extensionHostCommandMap = {
    'ExtensionHostSourceControl.getGroups': async (): Promise<never[]> => [],
  }
  const extensionHostMockRpc = ExtensionHost.registerMockRpc(extensionHostCommandMap)

  const parentCommandMap = {
    'ExtensionHostManagement.activateByEvent': async (): Promise<void> => {},
  }
  ParentRpc.registerMockRpc(parentCommandMap)

  const result = await SourceControl.getGroups('test-provider', 'test-root', '/test-asset-dir', 1)
  expect(result).toEqual([])
  expect(extensionHostMockRpc.invocations).toEqual([['ExtensionHostSourceControl.getGroups', 'test-provider', 'test-root']])
})

test('getFileDecorations should call ExtensionHostSourceControl.getFileDecorations', async (): Promise<void> => {
  const extensionHostCommandMap = {
    'ExtensionHostSourceControl.getFileDecorations': async (): Promise<never[]> => [],
  }
  const extensionHostMockRpc = ExtensionHost.registerMockRpc(extensionHostCommandMap)

  const parentCommandMap = {
    'ExtensionHostManagement.activateByEvent': async (): Promise<void> => {},
  }
  ParentRpc.registerMockRpc(parentCommandMap)

  const result = await SourceControl.getFileDecorations('test-provider', ['test-uri'], '/test-asset-dir', 1)
  expect(result).toEqual([])
  expect(extensionHostMockRpc.invocations).toEqual([['ExtensionHostSourceControl.getFileDecorations', 'test-provider', ['test-uri']]])
})

test('getIconDefinitions should return empty array when providerIds is empty', async (): Promise<void> => {
  const result = await SourceControl.getIconDefinitions([], '/assets', 1)
  expect(result).toEqual([])
})

test('getIconDefinitions should load icon definitions from extension metadata', async (): Promise<void> => {
  const extensionManagementMockRpc = ExtensionManagementWorker.registerMockRpc({
    'Extensions.getAllExtensions': async (): Promise<readonly any[]> => [
      {
        id: 'builtin.provider1',
        'source-control-icons': ['icon1.svg', 'icon2.svg'],
        uri: 'https://example.com/provider1',
      },
    ],
  })

  const result = await SourceControl.getIconDefinitions(['provider1', 'provider2'], '/assets', 1)
  expect(result).toEqual(['https://example.com/provider1/icon1.svg', 'https://example.com/provider1/icon2.svg'])
  expect(extensionManagementMockRpc.invocations).toEqual([['Extensions.getAllExtensions', '/assets', 1]])
})

test('getIconDefinitions should normalize icon uri dot segments', async (): Promise<void> => {
  ExtensionManagementWorker.registerMockRpc({
    'Extensions.getAllExtensions': async (): Promise<readonly any[]> => [
      {
        id: 'builtin.git',
        'source-control-icons': ['./icons/dark/status-modified.svg', 'icons/dark/../dark/status-added.svg'],
        uri: 'https://example.com/extensions/builtin.git',
      },
    ],
  })

  const result = await SourceControl.getIconDefinitions(['git'], '/assets', 1)
  expect(result).toEqual([
    'https://example.com/extensions/builtin.git/icons/dark/status-modified.svg',
    'https://example.com/extensions/builtin.git/icons/dark/status-added.svg',
  ])
})

test('getIconDefinitions should convert desktop file urls to remote urls', async (): Promise<void> => {
  ExtensionManagementWorker.registerMockRpc({
    'Extensions.getAllExtensions': async (): Promise<readonly any[]> => [
      {
        id: 'builtin.git',
        'source-control-icons': ['./icons/status-modified.svg'],
        uri: 'file:///usr/lib/lvce-editor/extensions/builtin.git',
      },
    ],
  })

  const result = await SourceControl.getIconDefinitions(['git'], '/assets', 2)
  expect(result).toEqual(['/remote/usr/lib/lvce-editor/extensions/builtin.git/icons/status-modified.svg'])
})

test('getIconDefinitions should normalize remote icon urls before converting them', async (): Promise<void> => {
  ExtensionManagementWorker.registerMockRpc({
    'Extensions.getAllExtensions': async (): Promise<readonly any[]> => [
      {
        id: 'builtin.git',
        'source-control-icons': ['./icons/dark/status-untracked.svg'],
        uri: 'http://localhost:3000/remote/home/user/source-control-provider',
      },
    ],
  })

  const result = await SourceControl.getIconDefinitions(['git'], '/assets', 3)
  expect(result).toEqual(['/remote/localhost:3000/remote/home/user/source-control-provider/icons/dark/status-untracked.svg'])
})

test('getIconDefinitions should return empty array on error', async (): Promise<void> => {
  ExtensionManagementWorker.registerMockRpc({
    'Extensions.getAllExtensions': async (): Promise<readonly any[]> => {
      throw new Error('test error')
    },
  })

  const result = await SourceControl.getIconDefinitions(['provider1'], '/assets', 1)
  expect(result).toEqual([])
})

test.each([undefined, null, false, 'unsupported', {}, { showGenerateCommitMessageButton: 'false' }, { showGenerateCommitMessageButton: true }])(
  'getShowGenerateCommitMessageButton defaults to visible for %j',
  async (features): Promise<void> => {
    using extensionRpc = ExtensionHost.registerMockRpc({
      'ExtensionHostSourceControl.getFeatures': async (): Promise<unknown> => features,
    })
    using parentRpc = ParentRpc.registerMockRpc({
      'ExtensionHostManagement.activateByEvent': async (): Promise<void> => {},
    })

    expect(await SourceControl.getShowGenerateCommitMessageButton('git', '/assets', 1)).toBe(true)
    expect(extensionRpc.invocations).toEqual([['ExtensionHostSourceControl.getFeatures', 'git']])
    expect(parentRpc.invocations).toHaveLength(1)
  },
)

test('getBadgeCount falls back to changed files and continues summing providers', async (): Promise<void> => {
  using extensionRpc = ExtensionHost.registerMockRpc({
    'ExtensionHost.sourceControlGetChangedFiles': async (): Promise<readonly string[]> => ['a.ts', 'b.ts'],
    'ExtensionHostSourceControl.getBadgeCount': async (providerId: string): Promise<number> => {
      if (providerId === 'legacy') {
        throw new Error('badge count unsupported')
      }
      return 3
    },
  })
  using parentRpc = ParentRpc.registerMockRpc({
    'ExtensionHostManagement.activateByEvent': async (): Promise<void> => {},
  })

  expect(await SourceControl.getBadgeCount(['legacy', 'git'], '/assets', 1)).toBe(5)
  expect(extensionRpc.invocations).toEqual([
    ['ExtensionHostSourceControl.getBadgeCount', 'legacy'],
    ['ExtensionHost.sourceControlGetChangedFiles', 'legacy'],
    ['ExtensionHostSourceControl.getBadgeCount', 'git'],
  ])
  expect(parentRpc.invocations).toHaveLength(3)
})

test('getBadgeCount treats an unavailable provider as zero and continues', async (): Promise<void> => {
  using extensionRpc = ExtensionHost.registerMockRpc({
    'ExtensionHost.sourceControlGetChangedFiles': async (): Promise<never> => {
      throw new Error('provider unavailable')
    },
    'ExtensionHostSourceControl.getBadgeCount': async (providerId: string): Promise<number> => {
      if (providerId === 'unavailable') {
        throw new Error('provider unavailable')
      }
      return 4
    },
  })
  using parentRpc = ParentRpc.registerMockRpc({
    'ExtensionHostManagement.activateByEvent': async (): Promise<void> => {},
  })

  expect(await SourceControl.getBadgeCount(['unavailable', 'git'], '/assets', 1)).toBe(4)
  expect(extensionRpc.invocations).toEqual([
    ['ExtensionHostSourceControl.getBadgeCount', 'unavailable'],
    ['ExtensionHost.sourceControlGetChangedFiles', 'unavailable'],
    ['ExtensionHostSourceControl.getBadgeCount', 'git'],
  ])
  expect(parentRpc.invocations).toHaveLength(3)
})

test('getBadgeCount without providers performs no RPC calls', async (): Promise<void> => {
  using extensionRpc = ExtensionHost.registerMockRpc({})
  using parentRpc = ParentRpc.registerMockRpc({})

  expect(await SourceControl.getBadgeCount([], '/assets', 1)).toBe(0)
  expect(extensionRpc.invocations).toEqual([])
  expect(parentRpc.invocations).toEqual([])
})
