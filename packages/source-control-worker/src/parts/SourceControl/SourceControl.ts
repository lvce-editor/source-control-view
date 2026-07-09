import * as Assert from '../Assert/Assert.ts'
import * as ExtensionHostSourceControl from '../ExtensionHostSourceControl/ExtensionHostSourceControl.ts'
import * as GetProtocol from '../GetProtocol/GetProtocol.ts'

export const state = {
  enabledProviders: [],
  initialized: false,
}

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

export const add = (file: string): Promise<void> => {
  // @ts-ignore
  return ExtensionHostSourceControl.add(file)
}

export const discard = (file: string): Promise<void> => {
  // @ts-ignore
  return ExtensionHostSourceControl.discard(file)
}

export const openFile = async (file: string): Promise<void> => {
  // TODO
}

export const getEnabledProviderIds = (scheme: string, root: string, assetDir: string, platform: number): Promise<readonly string[]> => {
  Assert.string(scheme)
  Assert.string(root)
  return ExtensionHostSourceControl.getEnabledProviderIds(scheme, root, assetDir, platform)
}

export const getGroups = (providerId: string, root: string, assetDir: string, platform: number): Promise<any> => {
  return ExtensionHostSourceControl.getGroups(providerId, root, assetDir, platform)
}

export const getIconDefinitions = async (providerIds: readonly string[]): Promise<readonly string[]> => {
  try {
    if (providerIds.length === 0) {
      return []
    }
    return await ExtensionHostSourceControl.getIconDefinitions(providerIds[0])
  } catch {
    return []
  }
}
