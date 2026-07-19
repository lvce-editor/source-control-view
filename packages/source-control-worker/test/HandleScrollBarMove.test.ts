import { expect, test } from '@jest/globals'
import type { SourceControlState } from '../src/parts/SourceControlState/SourceControlState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleScrollBarMove } from '../src/parts/HandleScrollBarMove/HandleScrollBarMove.ts'

const createScrollState = (): SourceControlState => ({
  ...createDefaultState(),
  finalDeltaY: 1000,
  handleOffset: 25,
  headerHeight: 50,
  height: 500,
  scrollBarActive: true,
  scrollBarHeight: 100,
  y: 10,
})

test('handleScrollBarMove - updates scroll position', async () => {
  const state = createScrollState()
  const eventY = state.y + state.headerHeight + state.handleOffset + 175

  const newState = await handleScrollBarMove(state, eventY)

  expect(newState.deltaY).toBe(500)
})

test('handleScrollBarMove - clamps above track', async () => {
  const state = createScrollState()

  const newState = await handleScrollBarMove(state, 0)

  expect(newState.deltaY).toBe(0)
})

test('handleScrollBarMove - ignores move when inactive', async () => {
  const state = {
    ...createScrollState(),
    scrollBarActive: false,
  }

  const newState = await handleScrollBarMove(state, 300)

  expect(newState).toBe(state)
})
