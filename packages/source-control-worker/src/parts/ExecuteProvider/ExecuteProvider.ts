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
  readonly applicationId: string
  readonly event: string
  readonly method: string
  readonly params: readonly any[]
  readonly platform: number
  readonly assetDir: string
}): Promise<any> => {
  await ActivateByEvent.activateByEvent(event, assetDir, platform, applicationId)
  return ApplicationExtensionRpc.invoke(applicationId, method, ...params)
}
