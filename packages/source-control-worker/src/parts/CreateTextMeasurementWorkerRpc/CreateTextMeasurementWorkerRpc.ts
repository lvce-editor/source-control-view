import { type Rpc, LazyTransferMessagePortRpcParent } from '@lvce-editor/rpc'
import { VError } from '@lvce-editor/verror'
import { sendMessagePortToTextMeasurementWorker } from '../SendMessagePortToTextMeasurementWorker/SendMessagePortToTextMeasurementWorker.ts'

export const createTextMeasurementWorkerRpc = async (): Promise<Rpc> => {
  try {
    const rpc = await LazyTransferMessagePortRpcParent.create({
      commandMap: {},
      send: sendMessagePortToTextMeasurementWorker,
    })
    return rpc
  } catch (error) {
    throw new VError(error, `Failed to create text measurement worker rpc`)
  }
}
