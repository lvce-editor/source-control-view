import { test, expect } from '@jest/globals'
import { RendererWorker as ParentRpc } from '@lvce-editor/rpc-registry'
import * as ExtensionHost from '../src/parts/ExtensionHost/ExtensionHost.ts'
import { getGroups } from '../src/parts/GetGroups/GetGroups.ts'

test('getGroups - aggregates groups from multiple providers', async (): Promise<void> => {
  const parentCommandMap = {
    'ExtensionHostManagement.activateByEvent': (): Promise<void> => Promise.resolve(),
  }
  const parentMockRpc = ParentRpc.registerMockRpc(parentCommandMap)

  const extensionHostCommandMap = {
    'ExtensionHostSourceControl.getGroups': (): Promise<Array<{ id: string }>> => Promise.resolve([{ id: 'group1' }, { id: 'group2' }]),
  }
  const extensionHostMockRpc = ExtensionHost.registerMockRpc(extensionHostCommandMap)

  const result = await getGroups(['provider1', 'provider2'])
  expect(result).toEqual({
    allGroups: [{ id: 'group1' }, { id: 'group2' }, { id: 'group1' }, { id: 'group2' }],
    gitRoot: '',
  })
  expect(parentMockRpc.invocations.length).toBeGreaterThan(0)
  expect(extensionHostMockRpc.invocations.length).toBeGreaterThan(0)
})

test('getGroups - empty providers', async (): Promise<void> => {
  const parentCommandMap = {
    'ExtensionHostManagement.activateByEvent': (): Promise<void> => Promise.resolve(),
  }
  const parentMockRpc = ParentRpc.registerMockRpc(parentCommandMap)

  const extensionHostCommandMap = {
    'ExtensionHostSourceControl.getGroups': (): Promise<never[]> => Promise.resolve([]),
  }
  const extensionHostMockRpc = ExtensionHost.registerMockRpc(extensionHostCommandMap)

  const result = await getGroups([])
  expect(result).toEqual({
    allGroups: [],
    gitRoot: '',
  })
  expect(parentMockRpc.invocations).toEqual([])
  expect(extensionHostMockRpc.invocations).toEqual([])
})

test('getGroups - single provider', async (): Promise<void> => {
  const parentCommandMap = {
    'ExtensionHostManagement.activateByEvent': (): Promise<void> => Promise.resolve(),
  }
  const parentMockRpc = ParentRpc.registerMockRpc(parentCommandMap)

  const extensionHostCommandMap = {
    'ExtensionHostSourceControl.getGroups': (): Promise<never[]> => Promise.resolve([]),
  }
  const extensionHostMockRpc = ExtensionHost.registerMockRpc(extensionHostCommandMap)

  const result = await getGroups(['provider1'])
  expect(result).toEqual({
    allGroups: [],
    gitRoot: '',
  })
  expect(parentMockRpc.invocations.length).toBeGreaterThan(0)
  expect(extensionHostMockRpc.invocations.length).toBeGreaterThan(0)
})

test('getGroups - multiple providers', async (): Promise<void> => {
  const parentCommandMap = {
    'ExtensionHostManagement.activateByEvent': (): Promise<void> => Promise.resolve(),
  }
  const parentMockRpc = ParentRpc.registerMockRpc(parentCommandMap)

  const extensionHostCommandMap = {
    'ExtensionHostSourceControl.getGroups': (): Promise<never[]> => Promise.resolve([]),
  }
  const extensionHostMockRpc = ExtensionHost.registerMockRpc(extensionHostCommandMap)

  const result = await getGroups(['provider1', 'provider2'])
  expect(result).toEqual({
    allGroups: [],
    gitRoot: '',
  })
  expect(parentMockRpc.invocations.length).toBeGreaterThan(0)
  expect(extensionHostMockRpc.invocations.length).toBeGreaterThan(0)
})
