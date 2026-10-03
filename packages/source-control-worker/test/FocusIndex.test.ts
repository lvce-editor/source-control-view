import { expect, test } from '@jest/globals'
import { DirentType } from '@lvce-editor/constants'
import { IconThemeWorker } from '@lvce-editor/rpc-registry'
import type { DisplayItem } from '../src/parts/DisplayItem/DisplayItem.ts'
import type { SourceControlState } from '../src/parts/SourceControlState/SourceControlState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as FocusIndex from '../src/parts/FocusIndex/FocusIndex.ts'

const items: DisplayItem[] = [0, 1, 2].map((index) => ({
  badgeCount: 0,
  decorationIcon: '',
  decorationIconTitle: '',
  decorationStrikeThrough: false,
  detail: '',
  file: `file-${index}.txt`,
  groupId: 'changes',
  icon: '',
  label: `file-${index}.txt`,
  posInSet: index + 1,
  setSize: 3,
  type: DirentType.File,
}))

const createState = (focusedIndex = -1): SourceControlState => ({
  ...createDefaultState(),
  focusedIndex,
  items,
  maxLineY: 3,
  visibleItems: [],
})

test('focusNext starts at the first item and stops at the last item', async () => {
  const first = await FocusIndex.focusNext(createState())
  expect(first.focusedIndex).toBe(0)
  expect(first.visibleItems[0].focused).toBe(true)

  const last = await FocusIndex.focusNext({ ...createState(1), visibleItems: first.visibleItems })
  expect(last.focusedIndex).toBe(2)
  expect(last.visibleItems[2].focused).toBe(true)
  expect(await FocusIndex.focusNext(last)).toBe(last)
})

test('focusPrevious starts at the last item and stops at the first item', async () => {
  const last = await FocusIndex.focusPrevious(createState())
  expect(last.focusedIndex).toBe(2)
  expect(last.visibleItems[2].focused).toBe(true)

  const first = await FocusIndex.focusPrevious({ ...createState(1), visibleItems: last.visibleItems })
  expect(first.focusedIndex).toBe(0)
  expect(await FocusIndex.focusPrevious(first)).toBe(first)
})

test('focusFirst and focusLast move focus to the list boundaries', async () => {
  const state = createState(1)
  const first = await FocusIndex.focusFirst(state)
  expect(first.focusedIndex).toBe(0)
  const last = await FocusIndex.focusLast(first)
  expect(last.focusedIndex).toBe(2)
})

test('focus movement preserves empty and already focused lists', async () => {
  const empty = createDefaultState()
  expect(await FocusIndex.focusNext(empty)).toBe(empty)
  expect(await FocusIndex.focusPrevious(empty)).toBe(empty)
  const first = createState(0)
  expect(await FocusIndex.focusFirst(first)).toBe(first)
})

test('focus movement scrolls an offscreen row into view', async () => {
  using _iconRpc = IconThemeWorker.registerMockRpc({
    'IconTheme.getIcons': async (): Promise<readonly string[]> => [],
  })
  const state: SourceControlState = {
    ...createState(0),
    finalDeltaY: 40,
    headerHeight: 40,
    height: 60,
    itemHeight: 20,
    maxLineY: 1,
  }
  const result = await FocusIndex.focusLast(state)
  expect(result.focusedIndex).toBe(2)
  expect(result.minLineY).toBeGreaterThan(0)
  expect(result.visibleItems.some((item) => item.focused)).toBe(true)
})
