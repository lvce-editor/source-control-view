import { WhenExpression } from '@lvce-editor/constants'
import { KeyCode, KeyModifier } from '@lvce-editor/virtual-dom-worker'
import type { KeyBinding } from '../KeyBinding/KeyBinding.ts'

export const getKeyBindings = (): readonly KeyBinding[] => {
  return [
    {
      key: KeyModifier.CtrlCmd | KeyCode.Enter,
      command: 'Source Control.acceptInput',
      when: WhenExpression.FocusSourceControlInput,
    },
  ]
}
