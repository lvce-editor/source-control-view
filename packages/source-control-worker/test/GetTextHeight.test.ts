import { test, expect } from '@jest/globals'
import { RendererWorker, TextMeasurementWorker } from '@lvce-editor/rpc-registry'
import * as GetTextHeight from '../src/parts/GetTextHeight/GetTextHeight.ts'

test('getTextHeight - measures through text measurement worker without renderer RPC', async () => {
  using rendererRpc = RendererWorker.registerMockRpc({})
  const commandMap = {
    'TextMeasurement.measureTextBlockHeight': async (): Promise<number> => 60,
  }
  using mockRpc = TextMeasurementWorker.registerMockRpc(commandMap)

  const result = await GetTextHeight.getTextHeight('test input', 200, 'Arial', 14, 400, 0, 30, 2)

  expect(result).toBe(64)
  expect(rendererRpc.invocations).toEqual([])
  expect(mockRpc.invocations).toEqual([['TextMeasurement.measureTextBlockHeight', 'test input', 'Arial', 14, '30px', 200]])
})

test('getTextHeight - falls back to line count calculation when RPC fails', async () => {
  const commandMap = {
    'TextMeasurement.measureTextBlockHeight': (): Promise<number> => {
      throw new Error('RPC error')
    },
  }
  TextMeasurementWorker.registerMockRpc(commandMap)

  const result = await GetTextHeight.getTextHeight('line1\nline2\nline3', 200, 'Arial', 14, 400, 0, 30, 0)

  expect(result).toBe(90) // 3 lines * 30 lineHeight + 0 * 2
})

test('getTextHeight - handles single line input', async () => {
  const commandMap = {
    'TextMeasurement.measureTextBlockHeight': (): Promise<number> => {
      throw new Error('RPC error')
    },
  }
  TextMeasurementWorker.registerMockRpc(commandMap)

  const result = await GetTextHeight.getTextHeight('single line', 200, 'Arial', 14, 400, 0, 25, 0)

  expect(result).toBe(25) // 1 line * 25 lineHeight + 0 * 2
})

test('getTextHeight - handles empty input', async () => {
  const commandMap = {
    'TextMeasurement.measureTextBlockHeight': async (): Promise<number> => 60,
  }
  using mockRpc = TextMeasurementWorker.registerMockRpc(commandMap)

  const result = await GetTextHeight.getTextHeight('', 200, 'Arial', 14, 400, 0, 30, 0)

  expect(mockRpc.invocations).toEqual([])
  expect(result).toBe(30) // empty string returns lineHeight + inputPadding * 2
})

test('getTextHeight - handles multiline input with different line heights', async () => {
  const commandMap = {
    'TextMeasurement.measureTextBlockHeight': (): Promise<number> => {
      throw new Error('RPC error')
    },
  }
  TextMeasurementWorker.registerMockRpc(commandMap)

  const result = await GetTextHeight.getTextHeight('line1\nline2\nline3\nline4', 200, 'Arial', 14, 400, 0, 20, 0)

  expect(result).toBe(80) // 4 lines * 20 lineHeight + 0 * 2
})

test('getTextHeight - calls RPC with correct parameters', async () => {
  const commandMap = {
    'TextMeasurement.measureTextBlockHeight': async (): Promise<number> => 50,
  }
  using mockRpc = TextMeasurementWorker.registerMockRpc(commandMap)

  await GetTextHeight.getTextHeight('test input', 200, 'Arial', 14, 400, 0, 30, 0)

  expect(mockRpc.invocations).toEqual([['TextMeasurement.measureTextBlockHeight', 'test input', 'Arial', 14, '30px', 200]])
})

test('getTextHeight - returns height from RPC call (line 21)', async (): Promise<void> => {
  const commandMap = {
    'TextMeasurement.measureTextBlockHeight': async (): Promise<number> => 75,
  }
  using mockRpc = TextMeasurementWorker.registerMockRpc(commandMap)

  const result = await GetTextHeight.getTextHeight('test input', 200, 'Arial', 14, 400, 0, 30, 0)

  expect(result).toBe(75)
  expect(mockRpc.invocations).toHaveLength(1)
  expect(mockRpc.invocations[0][0]).toBe('TextMeasurement.measureTextBlockHeight')
  expect(mockRpc.invocations[0][1]).toBe('test input')
  expect(mockRpc.invocations[0][2]).toBe('Arial')
  expect(mockRpc.invocations[0][3]).toBe(14)
  expect(mockRpc.invocations[0][4]).toBe('30px')
  expect(mockRpc.invocations[0][5]).toBe(200)
})
