import * as ActivateByEvent from '../ActivateByEvent/ActivateByEvent.ts'
import * as ExtensionHost from '../ExtensionHost/ExtensionHost.ts'

export const executeProvider = async ({ event, method, params }: { event: string; method: string; params: readonly any[] }): Promise<any> => {
  await ActivateByEvent.activateByEvent(event)
  const result = await ExtensionHost.invoke(method, ...params)
  return result
}
