import { expect, test } from '@jest/globals'
import { WhenExpression } from '@lvce-editor/constants'
import { KeyCode, KeyModifier } from '@lvce-editor/virtual-dom-worker'
import { getKeyBindings } from '../src/parts/GetKeyBindings/GetKeyBindings.ts'

test('getKeyBindings returns expected key bindings', (): void => {
  const result = getKeyBindings()
  expect(result).toEqual([
    {
      command: 'Source Control.acceptInput',
      key: KeyModifier.CtrlCmd | KeyCode.Enter,
      when: WhenExpression.FocusSourceControlInput,
    },
    {
      command: 'Source Control.focusPrevious',
      key: KeyCode.UpArrow,
      when: WhenExpression.FocusSourceControlList,
    },
    {
      command: 'Source Control.focusNext',
      key: KeyCode.DownArrow,
      when: WhenExpression.FocusSourceControlList,
    },
    {
      command: 'Source Control.focusFirst',
      key: KeyCode.Home,
      when: WhenExpression.FocusSourceControlList,
    },
    {
      command: 'Source Control.focusLast',
      key: KeyCode.End,
      when: WhenExpression.FocusSourceControlList,
    },
    {
      command: 'Source Control.activateFocused',
      key: KeyCode.Enter,
      when: WhenExpression.FocusSourceControlList,
    },
    {
      command: 'Source Control.activateFocused',
      key: KeyCode.Space,
      when: WhenExpression.FocusSourceControlList,
    },
    {
      command: 'Source Control.previousHistory',
      key: KeyCode.UpArrow,
      when: WhenExpression.FocusSourceControlInput,
    },
    {
      command: 'Source Control.nextHistory',
      key: KeyCode.DownArrow,
      when: WhenExpression.FocusSourceControlInput,
    },
  ])
})
