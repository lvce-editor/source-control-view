import * as Assert from '@lvce-editor/assert'
import * as ExecuteProvider from '../ExecuteProvider/ExecuteProvider.ts'
import * as ExtensionHostCommandType from '../ExtensionHostCommandType/ExtensionHostCommandType.ts'

export const acceptInput = async (providerId: string, text: string, assetDir: string, platform: number, applicationId?: string): Promise<void> => {
  return ExecuteProvider.executeProvider({
    applicationId,
    assetDir,
    event: 'none',
    method: ExtensionHostCommandType.SourceControlAcceptInput,
    params: [providerId, text],
    platform,
    // noProviderFoundMessage: 'No source control provider found',
  })
}

export const generateCommitMessage = async (providerId: string, assetDir: string, platform: number, applicationId?: string): Promise<string> => {
  return ExecuteProvider.executeProvider({
    applicationId,
    assetDir,
    event: 'none',
    method: ExtensionHostCommandType.SourceControlGenerateCommitMessage,
    params: [providerId],
    platform,
  })
}

export const getFeatures = async (providerId: string, assetDir: string, platform: number, applicationId?: string): Promise<any> => {
  return ExecuteProvider.executeProvider({
    applicationId,
    assetDir,
    event: 'none',
    method: ExtensionHostCommandType.SourceControlGetFeatures,
    params: [providerId],
    platform,
  })
}

export const getChangedFiles = (providerId: string, assetDir: string, platform: number, applicationId?: string): Promise<readonly any[]> => {
  return ExecuteProvider.executeProvider({
    applicationId,
    assetDir,
    event: 'none',
    method: ExtensionHostCommandType.SourceControlGetChangedFiles,
    params: [providerId],
    platform,
    // noProviderFoundMessage: 'No source control provider found',
  })
}

export const getBadgeCount = (providerId: string, assetDir: string, platform: number, applicationId?: string): Promise<any> => {
  return ExecuteProvider.executeProvider({
    applicationId,
    assetDir,
    event: 'none',
    method: ExtensionHostCommandType.SourceControlGetBadgeCount,
    params: [providerId],
    platform,
  })
}

export const getFileDecorations = (providerId: string, uris: readonly string[], assetDir: string, platform: number, applicationId?: string): Promise<readonly any[]> => {
  Assert.string(assetDir)
  Assert.number(platform)
  return ExecuteProvider.executeProvider({
    applicationId,
    assetDir,
    event: 'none',
    method: ExtensionHostCommandType.SourceControlGetFileDecorations,
    params: [providerId, uris],
    platform,
  })
}

export const getFileBefore = (providerId: string, path: string, assetDir: string, platform: number, applicationId?: string): Promise<any> => {
  return ExecuteProvider.executeProvider({
    applicationId,
    assetDir,
    event: 'none',
    method: ExtensionHostCommandType.SourceControlGetFileBefore,
    params: [providerId, path],
    platform,
    // noProviderFoundMessage: 'No source control provider found',
  })
}

export const getGroups = (providerId: string, path: string, assetDir: string, platform: number, applicationId?: string): Promise<any> => {
  return ExecuteProvider.executeProvider({
    applicationId,
    assetDir,
    event: 'none',
    method: ExtensionHostCommandType.SourceControlGetGroups,
    params: [providerId, path],
    platform,
    // noProviderFoundMessage: 'No source control provider found',
  })
}

export const getEnabledProviderIds = (scheme: string, root: string, assetDir: string, platform: number, applicationId?: string): Promise<readonly string[]> => {
  return ExecuteProvider.executeProvider({
    applicationId,
    assetDir,
    event: `onSourceControl:${scheme}`,
    method: ExtensionHostCommandType.SourceControlGetEnabledProviderIds,
    params: [scheme, root],
    platform,
    // noProviderFoundMessage: 'No source control provider found',
  })
}
