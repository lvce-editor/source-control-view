import { expect, test } from '@jest/globals'
import { ExtensionHost, ExtensionManagementWorker, RendererWorker } from '@lvce-editor/rpc-registry'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleClickFile } from '../src/parts/HandleClickFile/HandleClickFile.ts'
import { withRendererApplicationRouting } from './test-util/WithApplicationRouting.ts'
import { withApplicationRouting } from './test-util/WithApplicationRouting.ts'

test.each([
  { protocol: 'inline-diff', width: 799 } as const,
  { protocol: 'diff', width: 800 } as const,
  { inlineDiffEditorBreakpoint: 1000, protocol: 'inline-diff', width: 999 } as const,
  { inlineDiffEditorBreakpoint: 1000, protocol: 'diff', width: 1000 } as const,
  { inlineDiffEditorBreakpoint: 600, protocol: 'diff', width: 700 } as const,
])(
  'handleClickFile uses view width $width and breakpoint $inlineDiffEditorBreakpoint to open $protocol',
  async ({ inlineDiffEditorBreakpoint = createDefaultState().inlineDiffEditorBreakpoint, protocol, width }): Promise<void> => {
    using extensionRpc = ExtensionHost.registerMockRpc({
      'ExtensionHostSourceControl.getFileBefore': async (): Promise<string> => 'old content',
    })
    using _activationRpc = ExtensionManagementWorker.registerMockRpc(
      withApplicationRouting({
        'Extensions.activateByEvent': async (): Promise<void> => {},
      }),
    )
    using rendererRpc = RendererWorker.registerMockRpc(
      withRendererApplicationRouting({
        'FileSystem.readFile': async (): Promise<string> => 'new content',
        'Main.openUri': async (): Promise<void> => {},
      }),
    )
    const state = { ...createDefaultState(), enabledProviderIds: ['git'], inlineDiffEditorBreakpoint, root: '/workspace', width }

    const result = await handleClickFile(state, { file: 'src/index.ts' })

    expect(result).toBe(state)
    expect(extensionRpc.invocations).toEqual([['ExtensionHostSourceControl.getFileBefore', 'git', 'src/index.ts']])
    expect(rendererRpc.invocations).toContainEqual(['Application.execute', '', 'FileSystem.readFile', '/workspace/src/index.ts'])
    expect(rendererRpc.invocations.at(-1)).toEqual(['Application.execute', '', 'Main.openUri', { uri: `${protocol}://data://old content<->/workspace/src/index.ts` }])
  },
)

test('handleClickFile uses the application width and routes all operations to that application', async (): Promise<void> => {
  using extensionRpc = ExtensionManagementWorker.registerMockRpc(
    withApplicationRouting({
      'Extensions.invokeForApplication': async (_applicationId: string, method: string): Promise<string | undefined> => {
        if (method === 'ExtensionHostSourceControl.getFileBefore') {
          return 'original'
        }
        return undefined
      },
    }),
  )
  using rendererRpc = RendererWorker.registerMockRpc(
    withRendererApplicationRouting({
      'Application.execute': async (): Promise<string> => 'modified',
    }),
  )
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
  using _activationRpc = ExtensionManagementWorker.registerMockRpc(
    withApplicationRouting({
      'Extensions.activateByEvent': async (): Promise<void> => {},
    }),
  )
  using rendererRpc = RendererWorker.registerMockRpc(
    withRendererApplicationRouting({
      'FileSystem.readFile': async (): Promise<string> => {
        if (failure === 'filesystem') {
          throw new Error('filesystem failed')
        }
        return 'new content'
      },
      'Main.openUri': async (): Promise<void> => {},
    }),
  )
  const state = { ...createDefaultState(), enabledProviderIds: ['git'], root: '/workspace' }

  await expect(handleClickFile(state, { file: 'index.ts' })).rejects.toThrow(`${failure} failed`)
  expect(extensionRpc.invocations).toEqual([['ExtensionHostSourceControl.getFileBefore', 'git', 'index.ts']])
  expect(rendererRpc.invocations.some((invocation) => invocation[2] === 'Main.openUri')).toBe(false)
})
