import { PlatformType } from '@lvce-editor/constants'
import { ExtensionHost } from '@lvce-editor/rpc-registry'

const isCompatible = (extension: any, platform: number): boolean => {
  return platform !== PlatformType.Web || extension?.compatibility?.web !== false
}

export const getExtensions = async (platform: number): Promise<readonly any[]> => {
  const extensions = await ExtensionHost.invoke('Extensions.getExtensions')
  return extensions.filter((extension: any) => isCompatible(extension, platform))
}
