import { ExtensionHost } from '@lvce-editor/rpc-registry'
import * as ActivateByEvent from '../ActivateByEvent/ActivateByEvent.ts'
import * as ApplicationExtensionRpc from '../ApplicationExtensionRpc/ApplicationExtensionRpc.ts'

export const executeProvider = async ({
  applicationId,
  assetDir,
  event,
  method,
  params,
  platform,
}: {
  readonly applicationId?: string
  readonly event: string
  readonly method: string
  readonly params: readonly any[]
  readonly platform: number
  readonly assetDir: string
}): Promise<any> => {
  if (applicationId !== undefined) {
    await ApplicationExtensionRpc.invoke(applicationId, 'Extensions.activateByEvent', event)
    return ApplicationExtensionRpc.invoke(applicationId, method, ...params)
  }
  await ActivateByEvent.activateByEvent(event, assetDir, platform)
  // @ts-ignore
  const result = await ExtensionHost.invoke(method, ...params)
  return result
}
