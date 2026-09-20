import * as ViewletRegistry from '@lvce-editor/viewlet-registry'
import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'

export const { dispose, get, getCommandIds, registerCommands, set, wrapAsyncCommand, wrapCommand, wrapGetter } = ViewletRegistry.create<SourceControlState>()
