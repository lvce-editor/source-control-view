import { test, expect } from '@jest/globals'
import * as DirentType from '../src/parts/DirentType/DirentType.ts'
import { getContextId } from '../src/parts/GetContextId/GetContextId.ts'

test('file type', () => {
  const result = getContextId('test-group', DirentType.File)
  expect(result).toBe('test-group-item')
})

test('non-file type', () => {
  const result = getContextId('test-group', DirentType.Directory)
  expect(result).toBe('test-group')
})
