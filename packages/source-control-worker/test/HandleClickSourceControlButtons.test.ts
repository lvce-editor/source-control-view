import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import { ExtensionHost } from '@lvce-editor/rpc-registry'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleClickSourceControlButtons } from '../src/parts/HandleClickSourceControlButtons/HandleClickSourceControlButtons.ts'

const commandMap = {
  'ExtensionHostManagement.activateByEvent': () => Promise.resolve(),
  'ExtensionHostCommand.executeCommand': () => Promise.resolve(),
  'FileSystem.readDirWithFileTypes': () => Promise.resolve([])
}

test('handleClickSourceControlButtons - valid button click', async () => {
  const rendererMockRpc = RendererWorker.registerMockRpc(commandMap)
  const extensionHostMockRpc = ExtensionHost.registerMockRpc(commandMap)

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
  expect(rendererMockRpc.invocations.length).toBeGreaterThan(0)
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
