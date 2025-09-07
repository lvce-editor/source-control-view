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
  const commandMap = {
    'ExtensionHostSourceControl.acceptInput': () => Promise.resolve()
  }
  const mockRpc = ExtensionHost.registerMockRpc(commandMap)
  await SourceControl.acceptInput('test-provider', 'test-input')
  expect(mockRpc.invocations).toEqual([
    { method: 'ExtensionHostSourceControl.acceptInput', params: ['test-provider', 'test-input'] }
  ])
})

test('getChangedFiles should call ExtensionHostSourceControl.getChangedFiles', async () => {
  const commandMap = {
    'ExtensionHost.sourceControlGetChangedFiles': () => Promise.resolve([])
  }
  const mockRpc = ExtensionHost.registerMockRpc(commandMap)

  const result = await SourceControl.getChangedFiles('test-provider')
  expect(result).toEqual([])
  expect(mockRpc.invocations).toEqual([
    { method: 'ExtensionHost.sourceControlGetChangedFiles', params: ['test-provider'] }
  ])
})

test('getFileBefore should call ExtensionHostSourceControl.getFileBefore', async () => {
  const commandMap = {
    'ExtensionHostSourceControl.getFileBefore': () => Promise.resolve({})
  }
  const mockRpc = ExtensionHost.registerMockRpc(commandMap)

  const result = await SourceControl.getFileBefore('test-provider', 'test-file')
  expect(result).toEqual({})
  expect(mockRpc.invocations).toEqual([
    { method: 'ExtensionHostSourceControl.getFileBefore', params: ['test-provider', 'test-file'] }
  ])
})

test('add should call ExtensionHostSourceControl.add', async () => {
  const commandMap = {
    'ExtensionHostSourceControl.add': () => Promise.resolve()
  }
  const mockRpc = ExtensionHost.registerMockRpc(commandMap)

  await SourceControl.add('test-file')
  expect(mockRpc.invocations).toEqual([
    { method: 'ExtensionHostSourceControl.add', params: ['test-file'] }
  ])
})

test('discard should call ExtensionHostSourceControl.discard', async () => {
  const commandMap = {
    'ExtensionHostSourceControl.discard': () => Promise.resolve()
  }
  const mockRpc = ExtensionHost.registerMockRpc(commandMap)

  await SourceControl.discard('test-file')
  expect(mockRpc.invocations).toEqual([
    { method: 'ExtensionHostSourceControl.discard', params: ['test-file'] }
  ])
})

test('getEnabledProviderIds should call ExtensionHostSourceControl.getEnabledProviderIds', async () => {
  const commandMap = {
    'ExtensionHostSourceControl.getEnabledProviderIds': () => Promise.resolve(['test-provider'])
  }
  const mockRpc = ExtensionHost.registerMockRpc(commandMap)

  const result = await SourceControl.getEnabledProviderIds('test-scheme', 'test-root')
  expect(result).toEqual(['test-provider'])
  expect(mockRpc.invocations).toEqual([
    { method: 'ExtensionHostSourceControl.getEnabledProviderIds', params: ['test-scheme', 'test-root'] }
  ])
})

test('getGroups should call ExtensionHostSourceControl.getGroups', async () => {
  const commandMap = {
    'ExtensionHostSourceControl.getGroups': () => Promise.resolve([])
  }
  const mockRpc = ExtensionHost.registerMockRpc(commandMap)

  const result = await SourceControl.getGroups('test-provider', 'test-root')
  expect(result).toEqual([])
  expect(mockRpc.invocations).toEqual([
    { method: 'ExtensionHostSourceControl.getGroups', params: ['test-provider', 'test-root'] }
  ])
})
