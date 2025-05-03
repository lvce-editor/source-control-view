import { expect, test } from '@jest/globals'
import * as DiffType from '../src/parts/DiffType/DiffType.ts'
import { getRenderer } from '../src/parts/GetRenderer/GetRenderer.ts'
import * as RenderItems from '../src/parts/RenderItems/RenderItems.ts'

test('getRenderer - RenderItems', () => {
  const renderer = getRenderer(DiffType.RenderItems)
  expect(renderer).toBe(RenderItems.renderItems)
})

test('getRenderer - unknown diff type', () => {
  expect(() => {
    getRenderer(999)
  }).toThrow('unknown renderer')
})
