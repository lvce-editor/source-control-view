import type { MenuEntryId } from '@lvce-editor/constants'

interface ContextMenuPropsBase {
  readonly menuId: number
}

interface ContextMenuPropsSourceControl extends ContextMenuPropsBase {
  readonly menuId: typeof MenuEntryId.SourceControl
}

export type ContextMenuProps = ContextMenuPropsSourceControl
