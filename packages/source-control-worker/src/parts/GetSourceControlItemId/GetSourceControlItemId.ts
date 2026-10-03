export const getSourceControlItemId = (selected: boolean | undefined, focused: boolean | undefined): string | undefined => {
  if (selected) {
    return 'TreeItemActive'
  }
  if (focused) {
    return 'SourceControlTreeItemFocused'
  }
  return undefined
}
