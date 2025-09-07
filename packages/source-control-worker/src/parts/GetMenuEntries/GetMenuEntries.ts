import * as MenuEntryId from '../MenuEntryId/MenuEntryId.ts'
import * as MenuItemFlags from '../MenuItemFlags/MenuItemFlags.ts'
import * as ViewletSourceControlStrings from '../SourceControlStrings/SourceControlStrings.ts'

export const id = MenuEntryId.SourceControl

export const getMenuEntries = (): readonly any[] => {
  return [
    {
      label: ViewletSourceControlStrings.openChanges(),
      flags: MenuItemFlags.None,
      command: /* TODO */ -1,
    },
    {
      label: ViewletSourceControlStrings.openFile(),
      flags: MenuItemFlags.None,
      command: /* TODO */ -1,
    },
    {
      label: ViewletSourceControlStrings.openFileHead(),
      flags: MenuItemFlags.None,
      command: /* TODO */ -1,
    },
    {
      label: ViewletSourceControlStrings.discardChanges(),
      flags: MenuItemFlags.None,
      command: /* TODO */ -1,
    },
    {
      label: ViewletSourceControlStrings.stageChanges(),
      flags: MenuItemFlags.None,
      command: /* TODO */ -1,
    },
    {
      label: ViewletSourceControlStrings.addToGitignore(),
      flags: MenuItemFlags.None,
      command: /* TODO */ -1,
    },
    {
      label: ViewletSourceControlStrings.revealInExplorerView(),
      flags: MenuItemFlags.None,
      command: /* TODO */ -1,
    },
    {
      label: ViewletSourceControlStrings.openContainingFolder(),
      flags: MenuItemFlags.None,
      command: /* TODO */ -1,
    },
  ]
}
