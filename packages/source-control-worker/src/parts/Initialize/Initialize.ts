import { IconThemeWorker, TextMeasurementWorker } from '@lvce-editor/rpc-registry'
import { createIconThemeWorkerRpc } from '../CreateIconThemeWorkerRpc/CreateIconThemeWorkerRpc.ts'
import { createMenuWorkerRpc } from '../CreateMenuWorkerRpc/CreateMenuWorkerRpc.ts'
import { createTextMeasurementWorkerRpc } from '../CreateTextMeasurementWorkerRpc/CreateTextMeasurementWorkerRpc.ts'
import { initializeExtensionManagementWorker } from '../InitializeExtensionManagementWorker/InitializeExtensionManagementWorker.ts'
import * as MenuWorker from '../MenuWorker/MenuWorker.ts'

export const initialize = async (): Promise<void> => {
  const [textRpc, iconRpc, menuRpc] = await Promise.all([
    createTextMeasurementWorkerRpc(),
    createIconThemeWorkerRpc(),
    createMenuWorkerRpc(),
    initializeExtensionManagementWorker(),
  ])
  MenuWorker.set(menuRpc)
  TextMeasurementWorker.set(textRpc)
  IconThemeWorker.set(iconRpc)
}
