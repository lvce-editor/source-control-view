import type { Rpc } from '@lvce-editor/rpc'

let rpc: Rpc

export const set = (value: Rpc): void => {
  rpc = value
}

export const invoke = (method: string, ...args: readonly unknown[]): Promise<any> => {
  return rpc.invoke(method, ...args)
}
