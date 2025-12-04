import type { Action } from '../Action/Action.ts'
import * as ActionType from '../ActionType/ActionType.ts'
import * as MaskIcon from '../MaskIcon/MaskIcon.ts'
import * as ViewletSourceControlStrings from '../SourceControlStrings/SourceControlStrings.ts'

export const getActions = (): readonly Action[] => {
  return [
    {
      type: ActionType.Button,
      id: ViewletSourceControlStrings.viewAsTree(),
      icon: MaskIcon.ListFlat,
      command: '',
    },
    {
      type: ActionType.Button,
      id: ViewletSourceControlStrings.commitAndPush(),
      icon: MaskIcon.Check,
      command: '',
    },
    {
      type: ActionType.Button,
      id: ViewletSourceControlStrings.refresh(),
      icon: MaskIcon.Refresh,
      command: '',
    },
  ]
}
