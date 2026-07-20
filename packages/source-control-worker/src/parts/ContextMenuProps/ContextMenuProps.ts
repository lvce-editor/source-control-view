import type { MenuEntryId } from '@lvce-editor/constants'

export interface ContextMenuPropsBase {
  readonly menuId: number
}

export interface ContextMenuPropsSourceControl extends ContextMenuPropsBase {
  readonly menuId: typeof MenuEntryId.SourceControl
  readonly uri: string
}

export type ContextMenuProps = ContextMenuPropsSourceControl
