export const restoreExpandedGroups = (groups: readonly { readonly id: string }[]): Record<string, boolean> => {
  const expandedGroups: Record<string, boolean> = Object.create(null)
  for (const group of groups) {
    expandedGroups[group.id] = true
  }
  return expandedGroups
}
