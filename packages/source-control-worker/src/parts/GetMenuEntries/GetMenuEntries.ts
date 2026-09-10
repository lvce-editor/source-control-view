import { MenuItemFlags } from '@lvce-editor/constants'
import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'
import * as Strings from '../SourceControlStrings/SourceControlStrings.ts'

export const getMenuEntries = (uri: string, native = false): readonly MenuEntry[] => {
  const entries: MenuEntry[] = [
    { args: [uri], command: 'Source Control.openChanges', flags: MenuItemFlags.None, id: 'openChanges', label: Strings.openChanges() },
    { args: [uri], command: 'Source Control.openFile', flags: MenuItemFlags.None, id: 'openFile', label: Strings.openFile() },
    { args: [uri], command: 'Source Control.openFileHead', flags: MenuItemFlags.None, id: 'openFileHead', label: Strings.openFileHead() },
    { args: [uri], command: 'Source Control.revealInExplorer', flags: MenuItemFlags.None, id: 'revealInExplorerView', label: Strings.revealInExplorerView() },
  ]
  if (native) {
    entries.push({
      args: [uri],
      command: 'Source Control.openContainingFolder',
      flags: MenuItemFlags.None,
      id: 'openContainingFolder',
      label: Strings.openContainingFolder(),
    })
  }
  return entries
}
