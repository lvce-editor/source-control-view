import type { ContextMenuProps } from '../ContextMenuProps/ContextMenuProps.ts'
import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'
import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'
import { getMenuEntries } from '../GetMenuEntries/GetMenuEntries.ts'

export const getMenuEntries2 = (state: SourceControlState, props: ContextMenuProps): readonly MenuEntry[] => {
  return getMenuEntries(props.uri)
}
