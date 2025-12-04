import type { Action } from '../Action/Action.ts'
import * as ActionType from '../ActionType/ActionType.ts'
import * as InputName from '../InputName/InputName.ts'
import * as MaskIcon from '../MaskIcon/MaskIcon.ts'
import * as ViewletSourceControlStrings from '../SourceControlStrings/SourceControlStrings.ts'

export const getActions = (): readonly Action[] => {
  return [
    {
      type: ActionType.Button,
      id: ViewletSourceControlStrings.viewAsTree(),
      name: InputName.ViewAsTree,
      icon: MaskIcon.ListFlat,
      command: '',
    },
    {
      type: ActionType.Button,
      id: ViewletSourceControlStrings.commitAndPush(),
      name: InputName.CommitAndPush,
      icon: MaskIcon.Check,
      command: '',
    },
    {
      type: ActionType.Button,
      id: ViewletSourceControlStrings.refresh(),
      name: InputName.Refresh,
      icon: MaskIcon.Refresh,
      command: '',
    },
  ]
}
