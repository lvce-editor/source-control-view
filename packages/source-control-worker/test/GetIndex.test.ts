import { expect, test } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { getIndex } from '../src/parts/GetIndex/GetIndex.ts'

test('getIndex - first item', () => {
  const state = {
    ...createDefaultState(),
    headerHeight: 50,
    y: 100,
    itemHeight: 30,
  }
  const eventX = 0
  const eventY = 150
  const result = getIndex(state, eventX, eventY)
  expect(result).toBe(0)
})

test('getIndex - second item', () => {
  const state = {
    ...createDefaultState(),
    headerHeight: 50,
    y: 100,
    itemHeight: 30,
  }
  const eventX = 0
  const eventY = 180
  const result = getIndex(state, eventX, eventY)
  expect(result).toBe(1)
})

test('getIndex - negative y', () => {
  const state = {
    ...createDefaultState(),
    headerHeight: 50,
    y: 100,
    itemHeight: 30,
  }
  const eventX = 0
  const eventY = 50
  const result = getIndex(state, eventX, eventY)
  expect(result).toBe(-4)
})

test('getIndex - different header height', () => {
  const state = {
    ...createDefaultState(),
    headerHeight: 100,
    y: 100,
    itemHeight: 30,
  }
  const eventX = 0
  const eventY = 250
  const result = getIndex(state, eventX, eventY)
  expect(result).toBe(1)
})
