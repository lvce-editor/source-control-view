import { expect, jest, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import { ExtensionHost } from '@lvce-editor/rpc-registry'
import type { SourceControlState } from '../src/parts/SourceControlState/SourceControlState.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleClickSourceControlButtons } from '../src/parts/HandleClickSourceControlButtons/HandleClickSourceControlButtons.ts'

const commandMap = {
  'ExtensionHostManagement.activateByEvent': async (): Promise<void> => {},
  'ExtensionHostCommand.executeCommand': async (): Promise<void> => {},
  'FileSystem.readDirWithFileTypes': async (): Promise<never[]> => [],
}

test.skip('handleClickSourceControlButtons - valid button click', async (): Promise<void> => {
  const rendererMockRpc = RendererWorker.registerMockRpc(commandMap)
  ExtensionHost.registerMockRpc(commandMap)

  const state: SourceControlState = {
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

test.skip('handleClickSourceControlButtons - invalid index', async (): Promise<void> => {
  const state: SourceControlState = {
    ...CreateDefaultState.createDefaultState(),
    visibleItems: [],
  }
  const newState = await handleClickSourceControlButtons(state, 0, 'Stage')
  expect(newState).toBe(state)
})

test.skip('handleClickSourceControlButtons - invalid button name', async (): Promise<void> => {
  const consoleWarnSpy = jest.spyOn((globalThis as any).console, 'warn').mockImplementation(() => {})
  const state: SourceControlState = {
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
  expect(consoleWarnSpy).toHaveBeenCalledWith('[source-control-worker] Button not found InvalidButton')
  consoleWarnSpy.mockRestore()
})
