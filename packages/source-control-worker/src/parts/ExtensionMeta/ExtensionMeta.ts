import { PlatformType } from '@lvce-editor/constants'
import { ExtensionManagementWorker } from '@lvce-editor/rpc-registry'

const isCompatible = (extension: any, platform: number): boolean => {
  return platform !== PlatformType.Web || extension?.compatibility?.web !== false
}

export const getExtensions = async (assetDir: string, platform: number): Promise<readonly any[]> => {
  const extensions = await ExtensionManagementWorker.invoke('Extensions.getAllExtensions', assetDir, platform)
  return extensions.filter((extension: any) => isCompatible(extension, platform))
}
