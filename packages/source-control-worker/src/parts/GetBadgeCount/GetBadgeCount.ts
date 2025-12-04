import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'

export const getBadgeCount = (state: SourceControlState): number => {
  return state.badgeCount
}
