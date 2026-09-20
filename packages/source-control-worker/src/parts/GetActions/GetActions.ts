import { PlatformType, ViewMode } from '@lvce-editor/constants'
import type { Action } from '../Action/Action.ts'
import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'
import * as ActionType from '../ActionType/ActionType.ts'
import * as InputName from '../InputName/InputName.ts'
import * as MaskIcon from '../MaskIcon/MaskIcon.ts'
import * as ViewletSourceControlStrings from '../SourceControlStrings/SourceControlStrings.ts'

export const getActions = (state: SourceControlState): readonly Action[] => {
  const { enabledProviderIds, platform } = state
  if (platform === PlatformType.Web && enabledProviderIds.length === 0) {
    return [
      {
        command: '',
        icon: MaskIcon.Refresh,
        id: ViewletSourceControlStrings.refresh(),
        name: InputName.Refresh,
        type: ActionType.Button,
      },
    ]
  }
  const { viewMode } = state
  const isTree = viewMode === ViewMode.Tree
  const viewAction: Action = {
    command: '',
    icon: isTree ? MaskIcon.ListTree : MaskIcon.ListFlat,
    id: isTree ? ViewletSourceControlStrings.viewAsList() : ViewletSourceControlStrings.viewAsTree(),
    name: isTree ? InputName.ViewAsList : InputName.ViewAsTree,
    type: ActionType.Button,
  }
  const actions: Action[] = [
    viewAction,
    {
      command: '',
      icon: MaskIcon.Check,
      id: ViewletSourceControlStrings.commitAndPush(),
      name: InputName.CommitAndPush,
      type: ActionType.Button,
    },
    {
      command: '',
      icon: MaskIcon.Refresh,
      id: ViewletSourceControlStrings.refresh(),
      name: InputName.Refresh,
      type: ActionType.Button,
    },
  ]
  return actions
}
