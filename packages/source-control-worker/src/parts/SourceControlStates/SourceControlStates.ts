import * as ViewletRegistry from '@lvce-editor//viewlet-registry'
import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'

export const { get, set, wrapCommand, getCommandIds, registerCommands, wrapGetter } = ViewletRegistry.create<SourceControlState>()
