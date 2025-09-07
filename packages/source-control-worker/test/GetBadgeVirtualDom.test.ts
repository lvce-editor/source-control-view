import { test, expect } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import { getBadgeVirtualDom } from '../src/parts/GetBadgeVirtualDom/GetBadgeVirtualDom.ts'

test('getBadgeVirtualDom', () => {
  const result = getBadgeVirtualDom('test-class', 5)
  expect(result).toEqual([
    {
      type: VirtualDomElements.Div,
      className: 'Badge test-class',
      childCount: 1,
    },
    {
      type: VirtualDomElements.Text,
      text: '5',
      childCount: 0,
    },
  ])
})

test('getBadgeVirtualDom with zero count', () => {
  const result = getBadgeVirtualDom('test-class', 0)
  expect(result).toEqual([
    {
      type: VirtualDomElements.Div,
      className: 'Badge test-class',
      childCount: 1,
    },
    {
      type: VirtualDomElements.Text,
      text: '0',
      childCount: 0,
    },
  ])
})

test('getBadgeVirtualDom with empty className', () => {
  const result = getBadgeVirtualDom('', 5)
  expect(result).toEqual([
    {
      type: VirtualDomElements.Div,
      className: 'Badge ',
      childCount: 1,
    },
    {
      type: VirtualDomElements.Text,
      text: '5',
      childCount: 0,
    },
  ])
})
