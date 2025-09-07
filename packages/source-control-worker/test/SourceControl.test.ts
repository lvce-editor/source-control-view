import { beforeAll, expect, test } from '@jest/globals'
import * as ExtensionHost from '../src/parts/ExtensionHost/ExtensionHost.ts'
import * as ParentRpc from '../src/parts/ParentRpc/ParentRpc.ts'
import * as SourceControl from '../src/parts/SourceControl/SourceControl.ts'

beforeAll(() => {
  const commandMap = {}
  ParentRpc.registerMockRpc(commandMap)
})

test('state should be initialized with default values', () => {
  expect(SourceControl.state).toEqual({
    enabledProviders: [],
    initialized: false,
  })
})

test('acceptInput should call ExtensionHostSourceControl.acceptInput', async () => {
  const extensionHostCommandMap = {
    'ExtensionHostSourceControl.acceptInput': () => Promise.resolve()
  }
  const extensionHostMockRpc = ExtensionHost.registerMockRpc(extensionHostCommandMap)
  
  const parentCommandMap = {
    'ExtensionHostManagement.activateByEvent': () => Promise.resolve()
  }
  const parentMockRpc = ParentRpc.registerMockRpc(parentCommandMap)
  await SourceControl.acceptInput('test-provider', 'test-input')
  expect(extensionHostMockRpc.invocations).toEqual([
    ['ExtensionHostSourceControl.acceptInput', 'test-provider', 'test-input']
  ])
})

test('getChangedFiles should call ExtensionHostSourceControl.getChangedFiles', async () => {
  const extensionHostCommandMap = {
    'ExtensionHost.sourceControlGetChangedFiles': () => Promise.resolve([])
  }
  const extensionHostMockRpc = ExtensionHost.registerMockRpc(extensionHostCommandMap)
  
  const parentCommandMap = {
    'ExtensionHostManagement.activateByEvent': () => Promise.resolve()
  }
  const parentMockRpc = ParentRpc.registerMockRpc(parentCommandMap)

  const result = await SourceControl.getChangedFiles('test-provider')
  expect(result).toEqual([])
  expect(extensionHostMockRpc.invocations).toEqual([
    ['ExtensionHost.sourceControlGetChangedFiles', 'test-provider']
  ])
})

test('getFileBefore should call ExtensionHostSourceControl.getFileBefore', async () => {
  const extensionHostCommandMap = {
    'ExtensionHostSourceControl.getFileBefore': () => Promise.resolve({})
  }
  const extensionHostMockRpc = ExtensionHost.registerMockRpc(extensionHostCommandMap)
  
  const parentCommandMap = {
    'ExtensionHostManagement.activateByEvent': () => Promise.resolve()
  }
  const parentMockRpc = ParentRpc.registerMockRpc(parentCommandMap)

  const result = await SourceControl.getFileBefore('test-provider', 'test-file')
  expect(result).toEqual({})
  expect(extensionHostMockRpc.invocations).toEqual([
    ['ExtensionHostSourceControl.getFileBefore', 'test-provider', 'test-file']
  ])
})

test('add should call ExtensionHostSourceControl.add', async () => {
  const extensionHostCommandMap = {
    'ExtensionHostSourceControl.add': () => Promise.resolve()
  }
  const extensionHostMockRpc = ExtensionHost.registerMockRpc(extensionHostCommandMap)
  
  const parentCommandMap = {
    'ExtensionHostManagement.activateByEvent': () => Promise.resolve()
  }
  const parentMockRpc = ParentRpc.registerMockRpc(parentCommandMap)

  await SourceControl.add('test-file')
  expect(extensionHostMockRpc.invocations).toEqual([
    ['ExtensionHostSourceControl.add', 'test-file']
  ])
})

test('discard should call ExtensionHostSourceControl.discard', async () => {
  const extensionHostCommandMap = {
    'ExtensionHostSourceControl.discard': () => Promise.resolve()
  }
  const extensionHostMockRpc = ExtensionHost.registerMockRpc(extensionHostCommandMap)
  
  const parentCommandMap = {
    'ExtensionHostManagement.activateByEvent': () => Promise.resolve()
  }
  const parentMockRpc = ParentRpc.registerMockRpc(parentCommandMap)

  await SourceControl.discard('test-file')
  expect(extensionHostMockRpc.invocations).toEqual([
    ['ExtensionHostSourceControl.discard', 'test-file']
  ])
})

test('getEnabledProviderIds should call ExtensionHostSourceControl.getEnabledProviderIds', async () => {
  const extensionHostCommandMap = {
    'ExtensionHostSourceControl.getEnabledProviderIds': () => Promise.resolve(['test-provider'])
  }
  const extensionHostMockRpc = ExtensionHost.registerMockRpc(extensionHostCommandMap)
  
  const parentCommandMap = {
    'ExtensionHostManagement.activateByEvent': () => Promise.resolve()
  }
  const parentMockRpc = ParentRpc.registerMockRpc(parentCommandMap)

  const result = await SourceControl.getEnabledProviderIds('test-scheme', 'test-root')
  expect(result).toEqual(['test-provider'])
  expect(extensionHostMockRpc.invocations).toEqual([
    ['ExtensionHostSourceControl.getEnabledProviderIds', 'test-scheme', 'test-root']
  ])
})

test('getGroups should call ExtensionHostSourceControl.getGroups', async () => {
  const extensionHostCommandMap = {
    'ExtensionHostSourceControl.getGroups': () => Promise.resolve([])
  }
  const extensionHostMockRpc = ExtensionHost.registerMockRpc(extensionHostCommandMap)
  
  const parentCommandMap = {
    'ExtensionHostManagement.activateByEvent': () => Promise.resolve()
  }
  const parentMockRpc = ParentRpc.registerMockRpc(parentCommandMap)

  const result = await SourceControl.getGroups('test-provider', 'test-root')
  expect(result).toEqual([])
  expect(extensionHostMockRpc.invocations).toEqual([
    ['ExtensionHostSourceControl.getGroups', 'test-provider', 'test-root']
  ])
})
