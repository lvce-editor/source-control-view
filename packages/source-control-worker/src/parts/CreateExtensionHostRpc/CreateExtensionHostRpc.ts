import { type Rpc, MessagePortRpcParent } from '@lvce-editor/rpc'
import { VError } from '@lvce-editor/verror'
import * as GetPortTuple from '../GetPortTuple/GetPortTuple.ts'
import { sendMessagePortToExtensionHostWorker } from '../SendMessagePortToExtensionHostWorker/SendMessagePortToExtensionHostWorker.ts'

export const createExtensionHostRpc = async (): Promise<Rpc> => {
  try {
    const { port1, port2 } = GetPortTuple.getPortTuple()
    await sendMessagePortToExtensionHostWorker(port2)
    port1.start()
    const rpc = await MessagePortRpcParent.create({
      commandMap: {},
      messagePort: port1,
      isMessagePortOpen: false,
    })
    // TODO createMessageportRpcParent should call port start
    return rpc
  } catch (error) {
    throw new VError(error, `Failed to create extension host rpc`)
  }
}
