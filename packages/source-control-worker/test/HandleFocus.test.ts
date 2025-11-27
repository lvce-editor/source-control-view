import { expect, test } from '@jest/globals'
import type { SourceControlState } from '../src/parts/SourceControlState/SourceControlState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleInputFocus } from '../src/parts/HandleFocus/HandleFocus.ts'

test('handleFocus - returns state unchanged', async (): Promise<void> => {
  const state: SourceControlState = createDefaultState()
  const result = await handleInputFocus(state)
  expect(result).toBe(state)
})
