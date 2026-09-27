import { WhenExpression } from '@lvce-editor/constants'
import { KeyCode, KeyModifier } from '@lvce-editor/virtual-dom-worker'
import type { KeyBinding } from '../KeyBinding/KeyBinding.ts'

export const getKeyBindings = (): readonly KeyBinding[] => {
  return [
    {
      command: 'Source Control.acceptInput',
      key: KeyModifier.CtrlCmd | KeyCode.Enter,
      when: WhenExpression.FocusSourceControlInput,
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
  ]
}
