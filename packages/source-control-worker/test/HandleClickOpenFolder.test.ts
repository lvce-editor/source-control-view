import { test, expect } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as HandleClickOpenFolder from '../src/parts/HandleClickOpenFolder/HandleClickOpenFolder.ts'

test('handleClickOpenFolder - opens folder dialog for the current application', async () => {
  using rpc = RendererWorker.registerMockRpc({
    'Application.execute': async (): Promise<void> => {},
  })
  const state = { ...createDefaultState(), applicationId: 'application-1' }

  const result = await HandleClickOpenFolder.handleClickOpenFolder(state)

  expect(result).toBe(state)
  expect(rpc.invocations).toEqual([['Application.execute', 'application-1', 'Dialog.openFolder']])
})
