import { DirentType, MenuItemFlags, PlatformType } from '@lvce-editor/constants'
import type { ContextMenuProps } from '../ContextMenuProps/ContextMenuProps.ts'
import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'
import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'
import { getContextId } from '../GetContextId/GetContextId.ts'
import { getMenuEntries } from '../GetMenuEntries/GetMenuEntries.ts'

export const getMenuEntries2 = (state: SourceControlState, props: ContextMenuProps): readonly MenuEntry[] => {
  const { actionsCache, items, platform } = state
  const item = items[props.index]
  if (!item) {
    return []
  }
  const entries = item.type === DirentType.File ? getMenuEntries(props.uri, platform !== PlatformType.Web) : []
  const actions = actionsCache[getContextId(item.groupId, item.type)] || []
  const contributed = actions
    .filter((action) => entries.every((entry) => entry.label !== action.label))
    .map((action): MenuEntry => ({
      args: [item.file, item.groupId, action.command],
      command: 'Source Control.executeMenuAction',
      flags: MenuItemFlags.None,
      id: action.command,
      label: action.label,
    }))
  return [...entries, ...contributed]
}
