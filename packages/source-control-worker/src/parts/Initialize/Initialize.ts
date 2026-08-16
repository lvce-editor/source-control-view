import { TextMeasurementWorker } from '@lvce-editor/rpc-registry'
import { createTextMeasurementWorkerRpc } from '../CreateTextMeasurementWorkerRpc/CreateTextMeasurementWorkerRpc.ts'
import { initializeExtensionManagementWorker } from '../InitializeExtensionManagementWorker/InitializeExtensionManagementWorker.ts'

export const initialize = async (): Promise<void> => {
  const [textRpc] = await Promise.all([createTextMeasurementWorkerRpc(), initializeExtensionManagementWorker()])
  TextMeasurementWorker.set(textRpc)
}
