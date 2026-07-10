import { PlatformType, ViewletCommand } from '@lvce-editor/constants'
import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'
import * as GetSourceControlDom from '../GetSourceControlVirtualDom/GetSourceControlVirtualDom.ts'
import * as SourceControlStrings from '../SourceControlStrings/SourceControlStrings.ts'

export const renderItems = (oldState: SourceControlState, newState: SourceControlState): any => {
  const { allGroups, enabledProviderIds, id, initial, inputMessage, inputPlaceholder, platform, sourceControlButtons, visibleItems } = newState
  if (initial) {
    return [ViewletCommand.SetDom2, id, []]
  }
  const unavailableMessage = platform === PlatformType.Web && enabledProviderIds.length === 0 ? SourceControlStrings.noSourceControlProvidersAvailableForWeb() : ''
  const sourceControlButtonsDisabled = allGroups.every((group) => group.items.length === 0)
  const dom = GetSourceControlDom.getSourceControlVirtualDom(
    visibleItems,
    sourceControlButtons,
    sourceControlButtonsDisabled,
    inputPlaceholder,
    inputMessage,
    unavailableMessage,
  )
  return [ViewletCommand.SetDom2, id, dom]
}
