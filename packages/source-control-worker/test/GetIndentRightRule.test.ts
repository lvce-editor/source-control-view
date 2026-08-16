import { expect, test } from '@jest/globals'
import * as GetIndentRightRule from '../src/parts/GetIndentRightRule/GetIndentRightRule.ts'

test('getIndentRightRule', () => {
  expect(GetIndentRightRule.getIndentRightRule(12)).toBe(`.IndentRight-12 {
  padding-right: 12px;
}`)
})
