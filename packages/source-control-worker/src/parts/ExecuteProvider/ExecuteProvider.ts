import { ExtensionHost } from '@lvce-editor/rpc-registry'
import * as ActivateByEvent from '../ActivateByEvent/ActivateByEvent.ts'

export const executeProvider = async ({ event, method, params }: { readonly event: string; readonly method: string; readonly params: readonly any[] }): Promise<any> => {
  await ActivateByEvent.activateByEvent(event)
  // @ts-ignore
  const result = await ExtensionHost.invoke(method, ...params)
  return result
}
