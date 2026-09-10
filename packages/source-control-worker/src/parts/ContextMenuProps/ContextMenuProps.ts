import type { MenuEntryId } from '@lvce-editor/constants'

interface ContextMenuPropsBase {
  readonly menuId: number
}

interface ContextMenuPropsSourceControl extends ContextMenuPropsBase {
  readonly index: number
  readonly menuId: typeof MenuEntryId.SourceControl
  readonly uri: string
}

export type ContextMenuProps = ContextMenuPropsSourceControl
