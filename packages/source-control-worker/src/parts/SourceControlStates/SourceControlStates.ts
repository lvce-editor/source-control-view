import * as ViewletRegistry from '@lvce-editor//viewlet-registry'
import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'

export const { get, set, wrapCommand } = ViewletRegistry.create<SourceControlState>()
