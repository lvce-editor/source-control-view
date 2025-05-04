import { test, expect } from '@jest/globals'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as EmptySourceControlButtons from '../src/parts/EmptySourceControlButtons/EmptySourceControlButton.ts'
import { getButtonsVirtualDom } from '../src/parts/GetButtonsVirtualDom/GetButtonsVirtualDom.ts'
import * as VirtualDomElements from '../src/parts/VirtualDomElements/VirtualDomElements.ts'

test('empty buttons', () => {
  const result = getButtonsVirtualDom(EmptySourceControlButtons.emptySourceControlButtons)
  expect(result).toEqual([])
})

test('non-empty buttons', () => {
  const buttons = [
    {
      command: 'test-command',
      icon: 'test-icon',
      label: 'Test',
    },
  ]
  const result = getButtonsVirtualDom(buttons)
  expect(result).toEqual([
    {
      type: VirtualDomElements.Div,
      className: ClassNames.SourceControlButtons,
      childCount: 1,
    },
    {
      type: VirtualDomElements.Button,
      className: ClassNames.SourceControlButton,
      childCount: 1,
      title: 'Test',
      ariaLabel: 'Test',
      name: 'Test',
    },
    {
      type: VirtualDomElements.Span,
      className: 'MaskIcon MaskIcontest-icon',
      childCount: 0,
      role: 'none',
    },
  ])
})
