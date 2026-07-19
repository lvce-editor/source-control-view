import { expect, test } from '@jest/globals'
import type { SourceControlState } from '../src/parts/SourceControlState/SourceControlState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleScrollBarClick } from '../src/parts/HandleScrollBarClick/HandleScrollBarClick.ts'

const createScrollState = (): SourceControlState => ({
  ...createDefaultState(),
  finalDeltaY: 1000,
  headerHeight: 50,
  height: 500,
  scrollBarHeight: 100,
  y: 10,
})

test('handleScrollBarClick - activates existing thumb', async () => {
  const state = createScrollState()
  const eventY = state.y + state.headerHeight + 25

  const newState = await handleScrollBarClick(state, eventY)

  expect(newState.scrollBarActive).toBe(true)
  expect(newState.handleOffset).toBe(25)
  expect(newState.deltaY).toBe(0)
})

test('handleScrollBarClick - moves thumb to clicked position', async () => {
  const state = createScrollState()
  const eventY = state.y + state.headerHeight + 225

  const newState = await handleScrollBarClick(state, eventY)

  expect(newState.scrollBarActive).toBe(true)
  expect(newState.handleOffset).toBe(50)
  expect(newState.deltaY).toBe(500)
})
