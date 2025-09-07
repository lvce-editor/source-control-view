import { WebWorkerRpcClient } from '@lvce-editor/rpc'
import * as CommandMap from '../CommandMap/CommandMap.ts'
import * as ParentRpc from '../ParentRpc/ParentRpc.ts'
import { registerCommands } from '../SourceControlStates/SourceControlStates.ts'

export const listen = async (): Promise<void> => {
  registerCommands(CommandMap.commandMap)
  const rpc = await WebWorkerRpcClient.create({
    commandMap: CommandMap.commandMap,
  })
  ParentRpc.set(rpc)
}
