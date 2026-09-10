import { expect, test } from '@jest/globals'
import { ExtensionHost, ExtensionManagementWorker, RendererWorker } from '@lvce-editor/rpc-registry'
import { activateByEvent } from '../src/parts/ActivateByEvent/ActivateByEvent.ts'
import { executeProvider } from '../src/parts/ExecuteProvider/ExecuteProvider.ts'
import { withApplicationRouting } from './test-util/WithApplicationRouting.ts'

test('activation uses extension management without a renderer round trip', async (): Promise<void> => {
  using rendererRpc = RendererWorker.registerMockRpc({})
  using activationRpc = ExtensionManagementWorker.registerMockRpc(
    withApplicationRouting({
      'Extensions.activateByEvent': async (): Promise<void> => {},
    }),
  )

  await activateByEvent('onSourceControl:file', '/assets', 2, '')

  expect(activationRpc.invocations).toEqual([['Extensions.invokeForApplication', '', 'Extensions.activateByEvent', 'onSourceControl:file']])
  expect(rendererRpc.invocations).toEqual([])
})

test('provider execution waits for extension activation', async (): Promise<void> => {
  let activated = false
  using _activationRpc = ExtensionManagementWorker.registerMockRpc(
    withApplicationRouting({
      'Extensions.activateByEvent': async (): Promise<void> => {
        await Promise.resolve()
        activated = true
      },
    }),
  )
  using _providerRpc = ExtensionHost.registerMockRpc({
    'ExtensionHostSourceControl.getGroups': async (): Promise<string[]> => {
      expect(activated).toBe(true)
      return ['group']
    },
  })

  await expect(
    executeProvider({ applicationId: '', assetDir: '/assets', event: 'none', method: 'ExtensionHostSourceControl.getGroups', params: ['git'], platform: 2 }),
  ).resolves.toEqual(['group'])
})

test('activation transport failures prevent provider execution', async (): Promise<void> => {
  using _activationRpc = ExtensionManagementWorker.registerMockRpc(
    withApplicationRouting({
      'Extensions.activateByEvent': async (): Promise<never> => {
        throw new Error('activation failed')
      },
    }),
  )
  using providerRpc = ExtensionHost.registerMockRpc({})

  await expect(
    executeProvider({ applicationId: '', assetDir: '/assets', event: 'none', method: 'ExtensionHostSourceControl.getGroups', params: ['git'], platform: 2 }),
  ).rejects.toThrow('activation failed')
  expect(providerRpc.invocations).toEqual([])
})
