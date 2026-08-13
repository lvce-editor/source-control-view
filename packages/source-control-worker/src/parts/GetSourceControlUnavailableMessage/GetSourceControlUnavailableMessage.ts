import { ExtensionManagementWorker } from '@lvce-editor/rpc-registry'
import * as SourceControlStrings from '../SourceControlStrings/SourceControlStrings.ts'

const hasSourceControlActivation = (extension: any): boolean => {
  return (
    Array.isArray(extension?.activation) &&
    extension.activation.some(
      (activationEvent: unknown) => typeof activationEvent === 'string' && (activationEvent === 'onSourceControl' || activationEvent.startsWith('onSourceControl:')),
    )
  )
}

const isSourceControlExtension = (extension: any): boolean => {
  return Boolean(extension?.sourceControl) || hasSourceControlActivation(extension)
}

export const getSourceControlUnavailableMessage = async (assetDir: string, platform: number): Promise<string> => {
  try {
    const extensions = await ExtensionManagementWorker.invoke('Extensions.getAllExtensions', assetDir, platform)
    const sourceControlExtensions = extensions.filter(isSourceControlExtension)
    if (sourceControlExtensions.length === 0) {
      return SourceControlStrings.noSourceControlExtensionsInstalled()
    }
    if (sourceControlExtensions.every((extension: any) => extension.disabled === true)) {
      return SourceControlStrings.sourceControlExtensionsDisabled()
    }
    return SourceControlStrings.noSourceControlProviderForWorkspace()
  } catch {
    return SourceControlStrings.noSourceControlProvider()
  }
}
