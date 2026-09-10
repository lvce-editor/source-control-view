import * as Assert from '@lvce-editor/assert'
import * as ApplicationExtensionRpc from '../ApplicationExtensionRpc/ApplicationExtensionRpc.ts'

export const activateByEvent = (event: string, assetDir: string, platform: number, applicationId: string): Promise<void> => {
  Assert.string(event)
  Assert.string(assetDir)
  Assert.number(platform)
  return ApplicationExtensionRpc.invoke(applicationId, 'Extensions.activateByEvent', event)
}
