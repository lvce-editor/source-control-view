import * as ViewletRegistry from '@lvce-editor/viewlet-registry'
import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'

export const { dispose, get, getCommandIds, registerCommands, set, wrapCommand: wrapCommandActual, wrapGetter } = ViewletRegistry.create<SourceControlState>()

export const inputDiagnostics: unknown[] = []

export const wrapCommand: typeof wrapCommandActual = (fn) => {
  return wrapCommandActual(async (state, ...args) => {
    const { inputValue } = state
    const start = inputDiagnostics.length
    inputDiagnostics.push({ command: fn.name, inputValue, phase: 'start' })
    const result = await fn(state, ...args)
    inputDiagnostics.push({ command: fn.name, inputValue: result.inputValue, phase: 'end', start })
    return result
  })
}
