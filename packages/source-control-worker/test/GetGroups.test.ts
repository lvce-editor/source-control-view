import { test, expect } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import * as ParentRpc from '../src/parts/ParentRpc/ParentRpc.ts'
import * as ExtensionHost from '../src/parts/ExtensionHost/ExtensionHost.ts'
import { getGroups } from '../src/parts/GetGroups/GetGroups.ts'

test('getGroups - aggregates groups from multiple providers', async () => {
  const mockRpc = await MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'ExtensionHostManagement.activateByEvent') {
        return Promise.resolve()
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  ParentRpc.set(mockRpc)

  const mockExtensionHost = await MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'ExtensionHostSourceControl.getGroups') {
        return Promise.resolve([{ id: 'group1' }, { id: 'group2' }])
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  ExtensionHost.set(mockExtensionHost)

  const result = await getGroups(['provider1', 'provider2'])
  expect(result).toEqual({
    allGroups: [{ id: 'group1' }, { id: 'group2' }, { id: 'group1' }, { id: 'group2' }],
    gitRoot: '',
  })
})

test('getGroups - empty providers', async () => {
  const mockRpc = await MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'ExtensionHostManagement.activateByEvent') {
        return Promise.resolve()
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  ParentRpc.set(mockRpc)

  const mockExtensionHost = await MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'ExtensionHostSourceControl.getGroups') {
        return Promise.resolve([])
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  ExtensionHost.set(mockExtensionHost)

  const result = await getGroups([])
  expect(result).toEqual({
    allGroups: [],
    gitRoot: '',
  })
})

test('getGroups - single provider', async () => {
  const mockRpc = await MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'ExtensionHostManagement.activateByEvent') {
        return Promise.resolve()
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  ParentRpc.set(mockRpc)

  const mockExtensionHost = await MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'ExtensionHostSourceControl.getGroups') {
        return Promise.resolve([])
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  ExtensionHost.set(mockExtensionHost)

  const result = await getGroups(['provider1'])
  expect(result).toEqual({
    allGroups: [],
    gitRoot: '',
  })
})

test('getGroups - multiple providers', async () => {
  const mockRpc = await MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'ExtensionHostManagement.activateByEvent') {
        return Promise.resolve()
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  ParentRpc.set(mockRpc)

  const mockExtensionHost = await MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'ExtensionHostSourceControl.getGroups') {
        return Promise.resolve([])
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  ExtensionHost.set(mockExtensionHost)

  const result = await getGroups(['provider1', 'provider2'])
  expect(result).toEqual({
    allGroups: [],
    gitRoot: '',
  })
})
