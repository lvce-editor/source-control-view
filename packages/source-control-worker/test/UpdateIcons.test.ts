import { expect, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import * as RpcRegistry from '@lvce-editor/rpc-registry'
import type { SourceControlState } from '../src/parts/SourceControlState/SourceControlState.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { RendererWorker } from '../src/parts/RpcId/RpcId.ts'
import * as UpdateIcons from '../src/parts/UpdateIcons/UpdateIcons.ts'

const invoke = async (method: string, ...params: readonly any[]): Promise<any> => {
  if (method === 'IconTheme.getFileIcon' || method === 'IconTheme.getFolderIcon') {
    return ['icon1', 'icon2']
  }
  throw new Error(`Unexpected method: ${method}`)
}

const mockRpc = MockRpc.create({
  invoke,
  commandMap: {},
})

test('updateIcons - should update icons for visible items', async () => {
  RpcRegistry.set(RendererWorker, mockRpc)
  const defaultState = CreateDefaultState.createDefaultState()
  const state: SourceControlState = {
    ...defaultState,
    items: [
      // @ts-ignore
      { name: 'file1.ts', type: 1, path: '/test/file1.ts', depth: 1, selected: false },
      // @ts-ignore
      { name: 'file2.ts', type: 1, path: '/test/file2.ts', depth: 1, selected: false },
      // @ts-ignore
      { name: 'file3.ts', type: 1, path: '/test/file3.ts', depth: 1, selected: false },
    ],
    minLineY: 0,
    maxLineY: 2,
  }

  const result = await UpdateIcons.updateIcons(state)

  expect(result.fileIconCache).toBeDefined()
  expect(result.items).toEqual(state.items)
  expect(result.minLineY).toBe(state.minLineY)
  expect(result.maxLineY).toBe(state.maxLineY)
})

test('updateIcons - should handle empty visible items', async () => {
  RpcRegistry.set(RendererWorker, mockRpc)
  const defaultState = CreateDefaultState.createDefaultState()
  const state: SourceControlState = {
    ...defaultState,
    items: [],
    minLineY: 0,
    maxLineY: 0,
  }

  const result = await UpdateIcons.updateIcons(state)

  expect(result.fileIconCache).toBeDefined()
  expect(result.items).toEqual(state.items)
})
