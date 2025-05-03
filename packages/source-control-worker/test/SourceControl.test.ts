import { beforeAll, expect, jest, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import * as ExtensionHost from '../src/parts/ExtensionHost/ExtensionHost.ts'
import * as ParentRpc from '../src/parts/ParentRpc/ParentRpc.ts'
import * as SourceControl from '../src/parts/SourceControl/SourceControl.ts'

beforeAll(() => {
  ParentRpc.set(
    MockRpc.create({
      commandMap: {},
      invoke() {},
    }),
  )
})

test('state should be initialized with default values', () => {
  expect(SourceControl.state).toEqual({
    enabledProviders: [],
    initialized: false,
  })
})

test('acceptInput should call ExtensionHostSourceControl.acceptInput', async () => {
  const mockInvoke = jest.fn((method: string) => {
    if (method === 'ExtensionHostSourceControl.acceptInput') {
      return Promise.resolve()
    }
    throw new Error(`unexpected method ${method}`)
  })
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: mockInvoke,
  })
  ExtensionHost.set(mockRpc)
  await SourceControl.acceptInput('test-provider', 'test-input')
  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('ExtensionHostSourceControl.acceptInput', 'test-provider', 'test-input')
})

test('getChangedFiles should call ExtensionHostSourceControl.getChangedFiles', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'ExtensionHost.sourceControlGetChangedFiles') {
        return Promise.resolve([])
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  ExtensionHost.set(mockRpc)

  const result = await SourceControl.getChangedFiles('test-provider')
  expect(result).toEqual([])
})

test('getFileBefore should call ExtensionHostSourceControl.getFileBefore', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'ExtensionHostSourceControl.getFileBefore') {
        return Promise.resolve({})
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  ExtensionHost.set(mockRpc)

  const result = await SourceControl.getFileBefore('test-provider', 'test-file')
  expect(result).toEqual({})
})

test('add should call ExtensionHostSourceControl.add', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'ExtensionHostSourceControl.add') {
        return Promise.resolve()
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  ExtensionHost.set(mockRpc)

  await SourceControl.add('test-file')
})

test('discard should call ExtensionHostSourceControl.discard', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'ExtensionHostSourceControl.discard') {
        return Promise.resolve()
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  ExtensionHost.set(mockRpc)

  await SourceControl.discard('test-file')
})

test('getEnabledProviderIds should call ExtensionHostSourceControl.getEnabledProviderIds', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'ExtensionHostSourceControl.getEnabledProviderIds') {
        return Promise.resolve(['test-provider'])
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  ExtensionHost.set(mockRpc)

  const result = await SourceControl.getEnabledProviderIds('test-scheme', 'test-root')
  expect(result).toEqual(['test-provider'])
})

test('getGroups should call ExtensionHostSourceControl.getGroups', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'ExtensionHostSourceControl.getGroups') {
        return Promise.resolve([])
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  ExtensionHost.set(mockRpc)

  const result = await SourceControl.getGroups('test-provider', 'test-root')
  expect(result).toEqual([])
})
