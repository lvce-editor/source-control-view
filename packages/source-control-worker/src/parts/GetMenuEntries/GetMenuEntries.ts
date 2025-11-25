import { MenuItemFlags } from '@lvce-editor/constants'
import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'
import * as ViewletSourceControlStrings from '../SourceControlStrings/SourceControlStrings.ts'

export const getMenuEntries = (): readonly MenuEntry[] => {
  return [
    {
      label: ViewletSourceControlStrings.openChanges(),
      flags: MenuItemFlags.None,
      command: /* TODO */ '-1',
      id: '',
    },
    {
      label: ViewletSourceControlStrings.openFile(),
      flags: MenuItemFlags.None,
      command: /* TODO */ '-1',
      id: '',
    },
    {
      label: ViewletSourceControlStrings.openFileHead(),
      flags: MenuItemFlags.None,
      command: /* TODO */ '-1',
      id: '',
    },
    {
      label: ViewletSourceControlStrings.discardChanges(),
      flags: MenuItemFlags.None,
      command: /* TODO */ '-1',
      id: '',
    },
    {
      label: ViewletSourceControlStrings.stageChanges(),
      flags: MenuItemFlags.None,
      command: /* TODO */ '-1',
      id: '',
    },
    {
      label: ViewletSourceControlStrings.addToGitignore(),
      flags: MenuItemFlags.None,
      command: /* TODO */ '-1',
      id: '',
    },
    {
      label: ViewletSourceControlStrings.revealInExplorerView(),
      flags: MenuItemFlags.None,
      command: /* TODO */ '-1',
      id: '',
    },
    {
      label: ViewletSourceControlStrings.openContainingFolder(),
      flags: MenuItemFlags.None,
      command: /* TODO */ '-1',
      id: '',
    },
  ]
}
