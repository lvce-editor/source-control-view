import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as GetProgressVirtualDom from '../src/parts/GetProgressVirtualDom/GetProgressVirtualDom.ts'

test('getProgressVirtualDom', () => {
  expect(GetProgressVirtualDom.getProgressVirtualDom()).toEqual([
    {
      childCount: 1,
      className: ClassNames.ProgressContainer,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      className: ClassNames.Progress,
      type: VirtualDomElements.Div,
    },
  ])
})
