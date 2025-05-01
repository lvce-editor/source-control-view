import { expect, test } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { saveState } from '../src/parts/SaveState/SaveState.ts'
import { set } from '../src/parts/SourceControlStates/SourceControlStates.ts'

test('saveState', () => {
  const uid = 1
  const defaultState = createDefaultState()
  const state = {
    ...defaultState,
    root: '/test',
    maxLineY: 100,
  }
  set(uid, state, state)
  const result = saveState(uid)
  expect(result).toEqual({
    root: '/test',
    minLineY: 0,
    maxLineY: 100,
    deltaY: 0,
  })
})
