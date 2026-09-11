import { expect, test } from '@jest/globals'
import { ExtensionHost, ExtensionManagementWorker } from '@lvce-editor/rpc-registry'
import { getGroups } from '../src/parts/GetGroups/GetGroups.ts'
import { withApplicationRouting } from './test-util/WithApplicationRouting.ts'

test('getGroups - aggregates groups from multiple providers', async (): Promise<void> => {
  const activationCommandMap = {
    'Extensions.activateByEvent': async (): Promise<void> => {},
  }
  const activationMockRpc = ExtensionManagementWorker.registerMockRpc(withApplicationRouting(activationCommandMap))

  const extensionHostCommandMap = {
    'ExtensionHostSourceControl.getGroups': async (): Promise<Array<{ id: string }>> => [{ id: 'group1' }, { id: 'group2' }],
  }
  const extensionHostMockRpc = ExtensionHost.registerMockRpc(extensionHostCommandMap)

  const result = await getGroups(['provider1', 'provider2'], '/test-root', '/test-asset-dir', 1, '')
  expect(result).toEqual({
    allGroups: [{ id: 'group1' }, { id: 'group2' }, { id: 'group1' }, { id: 'group2' }],
    gitRoot: '',
  })
  expect(activationMockRpc.invocations.length).toBeGreaterThan(0)
  expect(extensionHostMockRpc.invocations.length).toBeGreaterThan(0)
})

test('getGroups - empty providers', async (): Promise<void> => {
  const activationCommandMap = {
    'Extensions.activateByEvent': async (): Promise<void> => {},
  }
  const activationMockRpc = ExtensionManagementWorker.registerMockRpc(withApplicationRouting(activationCommandMap))

  const extensionHostCommandMap = {
    'ExtensionHostSourceControl.getGroups': async (): Promise<never[]> => [],
  }
  const extensionHostMockRpc = ExtensionHost.registerMockRpc(extensionHostCommandMap)

  const result = await getGroups([], '/test-root', '/test-asset-dir', 1, '')
  expect(result).toEqual({
    allGroups: [],
    gitRoot: '',
  })
  expect(activationMockRpc.invocations).toEqual([])
  expect(extensionHostMockRpc.invocations).toEqual([])
})

test('getGroups - single provider', async (): Promise<void> => {
  const activationCommandMap = {
    'Extensions.activateByEvent': async (): Promise<void> => {},
  }
  const activationMockRpc = ExtensionManagementWorker.registerMockRpc(withApplicationRouting(activationCommandMap))

  const extensionHostCommandMap = {
    'ExtensionHostSourceControl.getGroups': async (): Promise<never[]> => [],
  }
  const extensionHostMockRpc = ExtensionHost.registerMockRpc(extensionHostCommandMap)

  const result = await getGroups(['provider1'], '/test-root', '/test-asset-dir', 1, '')
  expect(result).toEqual({
    allGroups: [],
    gitRoot: '',
  })
  expect(activationMockRpc.invocations.length).toBeGreaterThan(0)
  expect(extensionHostMockRpc.invocations.length).toBeGreaterThan(0)
})

test('getGroups - multiple providers', async (): Promise<void> => {
  const activationCommandMap = {
    'Extensions.activateByEvent': async (): Promise<void> => {},
  }
  const activationMockRpc = ExtensionManagementWorker.registerMockRpc(withApplicationRouting(activationCommandMap))

  const extensionHostCommandMap = {
    'ExtensionHostSourceControl.getGroups': async (): Promise<never[]> => [],
  }
  const extensionHostMockRpc = ExtensionHost.registerMockRpc(extensionHostCommandMap)

  const result = await getGroups(['provider1', 'provider2'], '/test-root', '/test-asset-dir', 1, '')
  expect(result).toEqual({
    allGroups: [],
    gitRoot: '',
  })
  expect(activationMockRpc.invocations.length).toBeGreaterThan(0)
  expect(extensionHostMockRpc.invocations.length).toBeGreaterThan(0)
})
