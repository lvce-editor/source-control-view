import { test, expect } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as GetTextHeight from '../src/parts/GetTextHeight/GetTextHeight.ts'

test('getTextHeight - returns height from RPC call when successful', async () => {
  const commandMap = {
    'MeasureTextHeight.measureTextBlockHeight': (): Promise<number> => Promise.resolve(60),
  }
  const mockRpc = RendererWorker.registerMockRpc(commandMap)

  const result = await GetTextHeight.getTextHeight('test input', 200, 'Arial', 14, 400, 0, 30)

  expect(result).toBe(60)
  expect(mockRpc.invocations).toEqual([['MeasureTextHeight.measureTextBlockHeight', '\ntest input', 'Arial', 14, '30px', 200]])
})

test('getTextHeight - falls back to line count calculation when RPC fails', async () => {
  const commandMap = {
    'MeasureTextHeight.measureTextBlockHeight': (): Promise<number> => {
      throw new Error('RPC error')
    },
  }
  RendererWorker.registerMockRpc(commandMap)

  const result = await GetTextHeight.getTextHeight('line1\nline2\nline3', 200, 'Arial', 14, 400, 0, 30)

  expect(result).toBe(90) // 3 lines * 30 lineHeight
})

test('getTextHeight - handles single line input', async () => {
  const commandMap = {
    'MeasureTextHeight.measureTextBlockHeight': (): Promise<number> => {
      throw new Error('RPC error')
    },
  }
  RendererWorker.registerMockRpc(commandMap)

  const result = await GetTextHeight.getTextHeight('single line', 200, 'Arial', 14, 400, 0, 25)

  expect(result).toBe(25) // 1 line * 25 lineHeight
})

test('getTextHeight - handles empty input', async () => {
  const commandMap = {
    'MeasureTextHeight.measureTextBlockHeight': (): Promise<number> => {
      throw new Error('RPC error')
    },
  }
  RendererWorker.registerMockRpc(commandMap)

  const result = await GetTextHeight.getTextHeight('', 200, 'Arial', 14, 400, 0, 30)

  expect(result).toBe(30) // 1 line * 30 lineHeight (empty string still counts as 1 line)
})

test('getTextHeight - handles multiline input with different line heights', async () => {
  const commandMap = {
    'MeasureTextHeight.measureTextBlockHeight': (): Promise<number> => {
      throw new Error('RPC error')
    },
  }
  RendererWorker.registerMockRpc(commandMap)

  const result = await GetTextHeight.getTextHeight('line1\nline2\nline3\nline4', 200, 'Arial', 14, 400, 0, 20)

  expect(result).toBe(80) // 4 lines * 20 lineHeight
})

test('getTextHeight - calls RPC with correct parameters', async () => {
  const commandMap = {
    'MeasureTextHeight.measureTextBlockHeight': (): Promise<number> => Promise.resolve(50),
  }
  const mockRpc = RendererWorker.registerMockRpc(commandMap)

  await GetTextHeight.getTextHeight('test input', 200, 'Arial', 14, 400, 0, 30)

  expect(mockRpc.invocations).toEqual([['MeasureTextHeight.measureTextBlockHeight', '\ntest input', 'Arial', 14, '30px', 200]])
})
