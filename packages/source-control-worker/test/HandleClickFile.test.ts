import { expect, test } from '@jest/globals'
import { ExtensionHost, ExtensionManagementWorker, RendererWorker } from '@lvce-editor/rpc-registry'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleClickFile } from '../src/parts/HandleClickFile/HandleClickFile.ts'

test.each([{ protocol: 'inline-diff', width: 799 } as const, { protocol: 'diff', width: 800 } as const])(
  'handleClickFile uses view width $width to open $protocol',
  async ({ protocol, width }): Promise<void> => {
    using extensionRpc = ExtensionHost.registerMockRpc({
      'ExtensionHostSourceControl.getFileBefore': async (): Promise<string> => 'old content',
    })
    using _activationRpc = ExtensionManagementWorker.registerMockRpc({
      'Extensions.activateByEvent': async (): Promise<void> => {},
    })
    using rendererRpc = RendererWorker.registerMockRpc({
      'FileSystem.readFile': async (): Promise<string> => 'new content',
      'Main.openUri': async (): Promise<void> => {},
    })
    const state = { ...createDefaultState(), enabledProviderIds: ['git'], root: '/workspace', width }

    const result = await handleClickFile(state, { file: 'src/index.ts' })

    expect(result).toBe(state)
    expect(extensionRpc.invocations).toEqual([['ExtensionHostSourceControl.getFileBefore', 'git', 'src/index.ts']])
    expect(rendererRpc.invocations).toContainEqual(['FileSystem.readFile', '/workspace/src/index.ts'])
    expect(rendererRpc.invocations.at(-1)).toEqual(['Main.openUri', { focus: undefined, uri: `${protocol}://data://old content<->/workspace/src/index.ts` }])
  },
)

test('handleClickFile uses the application width and routes all operations to that application', async (): Promise<void> => {
  using extensionRpc = ExtensionManagementWorker.registerMockRpc({
    'Extensions.invokeForApplication': async (_applicationId: string, method: string): Promise<string | undefined> => {
      if (method === 'ExtensionHostSourceControl.getFileBefore') {
        return 'original'
      }
      return undefined
    },
  })
  using rendererRpc = RendererWorker.registerMockRpc({
    'Application.execute': async (): Promise<string> => 'modified',
  })
  const state = { ...createDefaultState(), applicationId: 'preview-1', enabledProviderIds: ['git'], root: '/workspace', width: 800 }

  expect(await handleClickFile(state, { file: 'index.ts' })).toBe(state)
  expect(extensionRpc.invocations).toEqual([
    ['Extensions.invokeForApplication', 'preview-1', 'Extensions.activateByEvent', 'none'],
    ['Extensions.invokeForApplication', 'preview-1', 'ExtensionHostSourceControl.getFileBefore', 'git', 'index.ts'],
  ])
  expect(rendererRpc.invocations).toEqual([
    ['Application.execute', 'preview-1', 'FileSystem.readFile', '/workspace/index.ts'],
    ['Application.execute', 'preview-1', 'Main.openUri', { uri: 'diff://data://original<->/workspace/index.ts' }],
  ])
})

test.each(['provider', 'filesystem'])('handleClickFile does not open a diff after a %s failure', async (failure): Promise<void> => {
  using extensionRpc = ExtensionHost.registerMockRpc({
    'ExtensionHostSourceControl.getFileBefore': async (): Promise<string> => {
      if (failure === 'provider') {
        throw new Error('provider failed')
      }
      return 'old content'
    },
  })
  using _activationRpc = ExtensionManagementWorker.registerMockRpc({
    'Extensions.activateByEvent': async (): Promise<void> => {},
  })
  using rendererRpc = RendererWorker.registerMockRpc({
    'FileSystem.readFile': async (): Promise<string> => {
      if (failure === 'filesystem') {
        throw new Error('filesystem failed')
      }
      return 'new content'
    },
    'Main.openUri': async (): Promise<void> => {},
  })
  const state = { ...createDefaultState(), enabledProviderIds: ['git'], root: '/workspace' }

  await expect(handleClickFile(state, { file: 'index.ts' })).rejects.toThrow(`${failure} failed`)
  expect(extensionRpc.invocations).toEqual([['ExtensionHostSourceControl.getFileBefore', 'git', 'index.ts']])
  expect(rendererRpc.invocations.some(([method]) => method === 'Main.openUri')).toBe(false)
})
