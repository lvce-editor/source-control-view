import { expect, test } from '@jest/globals'
import { TextMeasurementWorker } from '@lvce-editor/rpc-registry'
import type { SourceControlState } from '../src/parts/SourceControlState/SourceControlState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleResize } from '../src/parts/HandleResize/HandleResize.ts'

test('handleResize remeasures the input and updates list geometry', async () => {
  using mockRpc = TextMeasurementWorker.registerMockRpc({
    'TextMeasurement.measureTextBlockHeight': async (): Promise<number> => 60,
  })
  const state: SourceControlState = {
    ...createDefaultState(),
    deltaY: 80,
    height: 200,
    inputValue: 'a long commit message',
    items: Array.from({ length: 20 }, (_, index) => ({
      badgeCount: 0,
      decorationIcon: '',
      decorationIconTitle: '',
      decorationStrikeThrough: false,
      detail: '',
      file: `file-${index}`,
      groupId: 'changes',
      icon: '',
      label: `file-${index}`,
      posInSet: index + 1,
      setSize: 20,
      type: 0,
    })),
    width: 400,
  }

  const result = await handleResize(state, { height: 120, width: 200 })

  expect(result.width).toBe(200)
  expect(result.height).toBe(120)
  expect(result.inputBoxHeight).toBe(64)
  expect(result.headerHeight).toBe(75)
  expect(result.finalDeltaY).toBe(355)
  expect(result.deltaY).toBe(80)
  expect(result.minLineY).toBe(4)
  expect(result.maxLineY).toBe(8)
  expect(mockRpc.invocations).toEqual([['TextMeasurement.measureTextBlockHeight', 'a long commit message', '', 15, '14.95px', 156]])
})

test('handleResize ignores invalid dimensions', async () => {
  const state = createDefaultState()
  await expect(handleResize(state, { height: NaN, width: 100 })).resolves.toBe(state)
})
