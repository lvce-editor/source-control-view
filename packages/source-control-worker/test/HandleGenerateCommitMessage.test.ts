import { expect, test } from '@jest/globals'
import { InputSource } from '@lvce-editor/constants'
import { ExtensionHost } from '@lvce-editor/rpc-registry'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { SourceControlState } from '../src/parts/SourceControlState/SourceControlState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleGenerateCommitMessage } from '../src/parts/HandleGenerateCommitMessage/HandleGenerateCommitMessage.ts'

test('handleGenerateCommitMessage - populates input value from provider', async (): Promise<void> => {
  const extensionHostCommandMap = {
    'ExtensionHostSourceControl.generateCommitMessage': async (): Promise<string> => 'feat: generated commit message',
  }
  const extensionHostMockRpc = ExtensionHost.registerMockRpc(extensionHostCommandMap)

  const rendererCommandMap = {
    'ExtensionHostManagement.activateByEvent': async (): Promise<void> => {},
    'MeasureTextHeight.measureTextBlockHeight': async (): Promise<number> => 40,
  }
  RendererWorker.registerMockRpc(rendererCommandMap)

  const state: SourceControlState = {
    ...createDefaultState(),
    assetDir: '/test-asset-dir',
    enabledProviderIds: ['test-provider'],
    inputMessage: 'Previous error',
    width: 200,
  }

  const result = await handleGenerateCommitMessage(state)

  expect(result.inputValue).toBe('feat: generated commit message')
  expect(result.inputMessage).toBe('')
  expect(result.inputSource).toBe(InputSource.Script)
  expect(extensionHostMockRpc.invocations).toEqual([['ExtensionHostSourceControl.generateCommitMessage', 'test-provider']])
})

test('handleGenerateCommitMessage - shows helpful error when provider throws', async (): Promise<void> => {
  const extensionHostCommandMap = {
    'ExtensionHostSourceControl.generateCommitMessage': async (): Promise<string> => {
      throw new Error('provider offline')
    },
  }
  const extensionHostMockRpc = ExtensionHost.registerMockRpc(extensionHostCommandMap)

  const rendererCommandMap = {
    'ExtensionHostManagement.activateByEvent': async (): Promise<void> => {},
  }
  RendererWorker.registerMockRpc(rendererCommandMap)

  const state: SourceControlState = {
    ...createDefaultState(),
    assetDir: '/test-asset-dir',
    enabledProviderIds: ['test-provider'],
  }

  const result = await handleGenerateCommitMessage(state)

  expect(result.inputValue).toBe('')
  expect(result.inputMessage).toBe('Failed to generate commit message: provider offline')
  expect(extensionHostMockRpc.invocations).toEqual([['ExtensionHostSourceControl.generateCommitMessage', 'test-provider']])
})
