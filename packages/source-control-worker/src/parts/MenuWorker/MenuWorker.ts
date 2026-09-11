import type { Rpc } from '@lvce-editor/rpc'

const state = {} as { rpc: Rpc }

export const set = (value: Rpc): void => {
  state.rpc = value
}

export const invoke = (method: string, ...args: readonly unknown[]): Promise<any> => {
  const { rpc } = state
  return rpc.invoke(method, ...args)
}
