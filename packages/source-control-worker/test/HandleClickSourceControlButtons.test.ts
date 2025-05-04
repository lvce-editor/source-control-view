import { expect, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import * as RpcRegistry from '@lvce-editor/rpc-registry'
import { ExtensionHost } from '@lvce-editor/rpc-registry'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleClickSourceControlButtons } from '../src/parts/HandleClickSourceControlButtons/HandleClickSourceControlButtons.ts'
import { RendererWorker } from '../src/parts/RpcId/RpcId.ts'

const invoke = async (method: string, ...params: readonly any[]): Promise<any> => {
  if (method === 'ExtensionHostManagement.activateByEvent') {
    return
  }
  if (method === 'ExtensionHostCommand.executeCommand') {
    return
  }
  if (method === 'FileSystem.readDirWithFileTypes') {
    return []
  }
  throw new Error(`unexpected method ${method}`)
}

const mockRpc = MockRpc.create({
  invoke,
  commandMap: {},
})

test('handleClickSourceControlButtons - valid button click', async () => {
  RpcRegistry.set(RendererWorker, mockRpc)
  ExtensionHost.set(mockRpc)

  const state = {
    ...CreateDefaultState.createDefaultState(),
    visibleItems: [
      {
        file: 'test.js',
        label: 'test.js',
        detail: '',
        posInSet: 1,
        setSize: 1,
        icon: '',
        decorationIcon: '',
        decorationIconTitle: '',
        decorationStrikeThrough: false,
        type: 0,
        badgeCount: 0,
        groupId: '',
        fileIcon: '',
        buttons: [
          {
            label: 'Stage',
            command: 'git.stage',
            icon: '',
          },
        ],
      },
    ],
  }

  const newState = await handleClickSourceControlButtons(state, 0, 'Stage')
  expect(newState).toBeDefined()
})

test('handleClickSourceControlButtons - invalid index', async () => {
  const state = {
    ...CreateDefaultState.createDefaultState(),
    visibleItems: [],
  }
  const newState = await handleClickSourceControlButtons(state, 0, 'Stage')
  expect(newState).toBe(state)
})

test('handleClickSourceControlButtons - invalid button name', async () => {
  const state = {
    ...CreateDefaultState.createDefaultState(),
    visibleItems: [
      {
        file: 'test.js',
        label: 'test.js',
        detail: '',
        posInSet: 1,
        setSize: 1,
        icon: '',
        decorationIcon: '',
        decorationIconTitle: '',
        decorationStrikeThrough: false,
        type: 0,
        badgeCount: 0,
        groupId: '',
        fileIcon: '',
        buttons: [
          {
            label: 'Stage',
            command: 'git.stage',
            icon: '',
          },
        ],
      },
    ],
  }

  const newState = await handleClickSourceControlButtons(state, 0, 'InvalidButton')
  expect(newState).toBe(state)
})
