import { ViewMode } from '@lvce-editor/constants'
import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'
import { setViewMode } from '../SetViewMode/SetViewMode.ts'

export const viewAsList = (state: SourceControlState): Promise<SourceControlState> => setViewMode(state, ViewMode.List)
