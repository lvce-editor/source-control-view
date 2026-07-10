import { test, expect } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../src/parts/DomEventListenerFunctions/DomEventListenerFunctions.ts'
import { getSourceControlButtonVirtualDom } from '../src/parts/GetSourceControlButtonVirtualDom/GetSourceControlButtonVirtualDom.ts'

test('getSourceControlButtonVirtualDom - enabled', () => {
  const result = getSourceControlButtonVirtualDom(
    {
      command: 'git.commitAndSync',
      icon: 'Lock',
      id: 'git.commitAndSync',
      label: 'Commit & Sync',
    },
    false,
  )

  expect(result).toEqual([
    {
      childCount: 1,
      className: ClassNames.SplitButton,
      type: VirtualDomElements.Div,
    },
    {
      ariaDisabled: false,
      childCount: 2,
      className: ClassNames.SplitButtonContent,
      name: 'Commit & Sync',
      onClick: DomEventListenerFunctions.HandleClickSourceControlButton,
      tabIndex: 0,
      title: 'git.commitAndSync',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      className: 'MaskIcon MaskIconLock',
      role: 'none',
      type: VirtualDomElements.Span,
    },
    {
      childCount: 0,
      text: 'Commit & Sync',
      type: VirtualDomElements.Text,
    },
  ])
})

test('getSourceControlButtonVirtualDom - disabled', () => {
  const result = getSourceControlButtonVirtualDom(
    {
      command: 'git.commitAndSync',
      icon: 'Lock',
      id: 'git.commitAndSync',
      label: 'Commit & Sync',
    },
    true,
  )

  expect(result).toEqual([
    {
      childCount: 1,
      className: `${ClassNames.SplitButton} ${ClassNames.SplitButtonDisabled}`,
      type: VirtualDomElements.Div,
    },
    {
      ariaDisabled: true,
      childCount: 2,
      className: `${ClassNames.SplitButtonContent} ${ClassNames.SplitButtonContentDisabled}`,
      name: 'Commit & Sync',
      tabIndex: -1,
      title: 'git.commitAndSync',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      className: 'MaskIcon MaskIconLock',
      role: 'none',
      type: VirtualDomElements.Span,
    },
    {
      childCount: 0,
      text: 'Commit & Sync',
      type: VirtualDomElements.Text,
    },
  ])
})
