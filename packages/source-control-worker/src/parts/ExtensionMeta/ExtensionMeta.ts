import { PlatformType } from '@lvce-editor/constants'
import * as ApplicationExtensionRpc from '../ApplicationExtensionRpc/ApplicationExtensionRpc.ts'

export const getExtensions = async (assetDir: string, platform: number, applicationId?: string): Promise<readonly any[]> => {
  const extensions = await ApplicationExtensionRpc.invoke(applicationId, 'Extensions.getAllExtensions', assetDir, platform)
  return extensions.filter((extension: any) => platform !== PlatformType.Web || extension?.compatibility?.web !== false)
}
