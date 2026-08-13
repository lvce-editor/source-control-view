import { expect, test } from '@jest/globals'
import { ExtensionManagementWorker } from '@lvce-editor/rpc-registry'
import { getSourceControlUnavailableMessage } from '../src/parts/GetSourceControlUnavailableMessage/GetSourceControlUnavailableMessage.ts'

test('returns installed message when no source control extension is installed', async () => {
  using mockRpc = ExtensionManagementWorker.registerMockRpc({
    'Extensions.getAllExtensions': async (): Promise<readonly any[]> => [{ id: 'builtin.theme' }],
  })

  const result = await getSourceControlUnavailableMessage('/test-assets', 1)

  expect(result).toBe('No source control extensions are installed.')
  expect(mockRpc.invocations).toEqual([['Extensions.getAllExtensions', '/test-assets', 1]])
})

test('returns disabled message when all source control extensions are disabled', async () => {
  ExtensionManagementWorker.registerMockRpc({
    'Extensions.getAllExtensions': async (): Promise<readonly any[]> => [
      {
        activation: ['onSourceControl:file'],
        disabled: true,
        id: 'builtin.git',
      },
      {
        disabled: true,
        id: 'builtin.other-source-control',
        sourceControl: {
          scheme: 'other',
        },
      },
    ],
  })

  const result = await getSourceControlUnavailableMessage('/test-assets', 1)

  expect(result).toBe('All installed source control extensions are disabled.')
})

test('returns workspace message when an enabled source control extension is installed', async () => {
  ExtensionManagementWorker.registerMockRpc({
    'Extensions.getAllExtensions': async (): Promise<readonly any[]> => [
      {
        activation: ['onSourceControl:file'],
        id: 'builtin.git',
      },
    ],
  })

  const result = await getSourceControlUnavailableMessage('/test-assets', 1)

  expect(result).toBe('No source control provider is available for this workspace.')
})

test('returns fallback message when extension management is unavailable', async () => {
  ExtensionManagementWorker.registerMockRpc({
    'Extensions.getAllExtensions': async (): Promise<readonly any[]> => {
      throw new Error('Failed to load extensions')
    },
  })

  const result = await getSourceControlUnavailableMessage('/test-assets', 1)

  expect(result).toBe('No source control provider is enabled or installed.')
})
