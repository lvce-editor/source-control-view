import { IconThemeWorker, TextMeasurementWorker } from '@lvce-editor/rpc-registry'
import { createIconThemeWorkerRpc } from '../CreateIconThemeWorkerRpc/CreateIconThemeWorkerRpc.ts'
import { createTextMeasurementWorkerRpc } from '../CreateTextMeasurementWorkerRpc/CreateTextMeasurementWorkerRpc.ts'
import { initializeExtensionManagementWorker } from '../InitializeExtensionManagementWorker/InitializeExtensionManagementWorker.ts'

export const initialize = async (): Promise<void> => {
  const [textRpc, iconRpc] = await Promise.all([createTextMeasurementWorkerRpc(), createIconThemeWorkerRpc(), initializeExtensionManagementWorker()])
  TextMeasurementWorker.set(textRpc)
  IconThemeWorker.set(iconRpc)
}
