import * as RpcId from '../RpcId/RpcId.ts'
import * as RpcRegistry from '../RpcRegistry/RpcRegistry.ts'

export const invoke = async (method: string, ...params: readonly any[]): Promise<any> => {
  const rpc = RpcRegistry.get(RpcId.ExtensionHostWorker)
  return rpc.invoke(method, ...params)
}
