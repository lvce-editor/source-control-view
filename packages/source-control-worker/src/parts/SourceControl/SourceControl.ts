import { PlatformType } from '@lvce-editor/constants'
import * as Assert from '../Assert/Assert.ts'
import * as ExtensionHostSourceControl from '../ExtensionHostSourceControl/ExtensionHostSourceControl.ts'
import * as ExtensionMeta from '../ExtensionMeta/ExtensionMeta.ts'
import * as GetProtocol from '../GetProtocol/GetProtocol.ts'

export const acceptInput = (providerId: string, text: string, assetDir: string, platform: number): Promise<void> => {
  Assert.string(providerId)
  Assert.string(text)
  return ExtensionHostSourceControl.acceptInput(providerId, text, assetDir, platform)
}

export const generateCommitMessage = (providerId: string, assetDir: string, platform: number): Promise<string> => {
  Assert.string(providerId)
  return ExtensionHostSourceControl.generateCommitMessage(providerId, assetDir, platform)
}

export const getShowGenerateCommitMessageButton = async (providerId: string, assetDir: string, platform: number): Promise<boolean> => {
  Assert.string(providerId)
  try {
    const features = await ExtensionHostSourceControl.getFeatures(providerId, assetDir, platform)
    if (!features || typeof features !== 'object') {
      return true
    }
    if ('showGenerateCommitMessageButton' in features && typeof features.showGenerateCommitMessageButton === 'boolean') {
      return features.showGenerateCommitMessageButton
    }
    return true
  } catch {
    return true
  }
}

export const getChangedFiles = (providerId: string, assetDir: string, platform: number): Promise<readonly any[]> => {
  return ExtensionHostSourceControl.getChangedFiles(providerId, assetDir, platform)
}

const getProviderBadgeCount = async (providerId: string, assetDir: string, platform: number): Promise<any> => {
  try {
    return await ExtensionHostSourceControl.getBadgeCount(providerId, assetDir, platform)
  } catch {
    try {
      const changedFiles = await ExtensionHostSourceControl.getChangedFiles(providerId, assetDir, platform)
      return changedFiles.length
    } catch {
      return 0
    }
  }
}

export const getBadgeCount = async (providerIds: readonly string[], assetDir: string, platform: number): Promise<any> => {
  let badgeCount = 0
  for (const providerId of providerIds) {
    badgeCount += await getProviderBadgeCount(providerId, assetDir, platform)
  }
  return badgeCount
}

export const getWorkspaceBadgeCount = async (root: string, assetDir: string, platform: number): Promise<any> => {
  const scheme = GetProtocol.getProtocol(root)
  const providerIds = await getEnabledProviderIds(scheme, root, assetDir, platform)
  return getBadgeCount(providerIds, assetDir, platform)
}

export const getFileDecorations = (providerId: string, uris: readonly string[], assetDir: string, platform: number): Promise<readonly any[]> => {
  return ExtensionHostSourceControl.getFileDecorations(providerId, uris, assetDir, platform)
}

export const getFileBefore = (providerId: string, file: string, assetDir: string, platform: number): Promise<any> => {
  return ExtensionHostSourceControl.getFileBefore(providerId, file, assetDir, platform)
}

export const getEnabledProviderIds = (scheme: string, root: string, assetDir: string, platform: number): Promise<readonly string[]> => {
  Assert.string(scheme)
  Assert.string(root)
  return ExtensionHostSourceControl.getEnabledProviderIds(scheme, root, assetDir, platform)
}

export const getGroups = (providerId: string, root: string, assetDir: string, platform: number): Promise<any> => {
  return ExtensionHostSourceControl.getGroups(providerId, root, assetDir, platform)
}

export const getIconDefinitions = async (providerIds: readonly string[], assetDir: string, platform: number): Promise<readonly string[]> => {
  try {
    if (providerIds.length === 0) {
      return []
    }
    const extensions = await ExtensionMeta.getExtensions(assetDir, platform)
    const extension = extensions.find((extension) => {
      const idParts = typeof extension?.id === 'string' ? extension.id.split('.') : []
      return idParts[1] === providerIds[0]
    })
    if (!Array.isArray(extension?.['source-control-icons']) || typeof extension.uri !== 'string') {
      return []
    }
    const icons = extension['source-control-icons'].filter((icon: unknown): icon is string => typeof icon === 'string')
    const baseUri = extension.uri.endsWith('/') ? extension.uri : `${extension.uri}/`
    return icons.map((icon) => {
      const uri = new URL(icon, baseUri).href
      if (platform === PlatformType.Electron || platform === PlatformType.Remote) {
        const protocol = GetProtocol.getProtocol(uri)
        const path = GetProtocol.getPath(protocol, uri)
        return `/remote${path.startsWith('/') ? '' : '/'}${path}`
      }
      return uri
    })
  } catch {
    return []
  }
}
