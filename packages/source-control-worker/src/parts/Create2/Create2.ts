import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'
import { createDefaultState } from '../CreateDefaultState/CreateDefaultState.ts'
import * as SourceControlStates from '../SourceControlStates/SourceControlStates.ts'

export const create2 = (
  id: number,
  _uri: string,
  x: number,
  y: number,
  width: number,
  height: number,
  workspacePath: string,
  platform: number,
  assetDir: string,
): void => {
  const defaultState = createDefaultState()
  const state: SourceControlState = {
    ...defaultState,
    assetDir,
    height,
    id,
    initial: true,
    platform,
    width,
    workspacePath,
    x,
    y,
  }
  SourceControlStates.set(id, state, state)
}
