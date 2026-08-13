import { MenuItemFlags } from '@lvce-editor/constants'
import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'
import * as ViewletSourceControlStrings from '../SourceControlStrings/SourceControlStrings.ts'

export const getMenuEntries = (uri: string): readonly MenuEntry[] => {
  return [
    {
      command: /* TODO */ '-1',
      flags: MenuItemFlags.None,
      id: '',
      label: ViewletSourceControlStrings.openChanges(),
    },
    {
      command: /* TODO */ '-1',
      flags: MenuItemFlags.None,
      id: '',
      label: ViewletSourceControlStrings.openFile(),
    },
    {
      command: /* TODO */ '-1',
      flags: MenuItemFlags.None,
      id: '',
      label: ViewletSourceControlStrings.openFileHead(),
    },
    {
      command: /* TODO */ '-1',
      flags: MenuItemFlags.None,
      id: '',
      label: ViewletSourceControlStrings.discardChanges(),
    },
    {
      command: /* TODO */ '-1',
      flags: MenuItemFlags.None,
      id: '',
      label: ViewletSourceControlStrings.stageChanges(),
    },
    {
      command: /* TODO */ '-1',
      flags: MenuItemFlags.None,
      id: '',
      label: ViewletSourceControlStrings.addToGitignore(),
    },
    {
      args: [uri],
      command: 'Source Control.revealInExplorer',
      flags: MenuItemFlags.None,
      id: 'revealInExplorerView',
      label: ViewletSourceControlStrings.revealInExplorerView(),
    },
    {
      command: /* TODO */ '-1',
      flags: MenuItemFlags.None,
      id: '',
      label: ViewletSourceControlStrings.openContainingFolder(),
    },
  ]
}
