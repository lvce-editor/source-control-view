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
  workspaceUri: string,
  platform: number,
  assetDir: string,
  applicationId: string,
): void => {
  const defaultState = createDefaultState()
  const state: SourceControlState = {
    ...defaultState,
    applicationId,
    assetDir,
    height,
    id,
    initial: false,
    loading: true,
    platform,
    width,
    workspaceUri,
    x,
    y,
  }
  SourceControlStates.set(
    id,
    {
      ...state,
      initial: true,
      loading: false,
    },
    state,
  )
}
