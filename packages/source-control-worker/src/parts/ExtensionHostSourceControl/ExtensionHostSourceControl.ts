import * as ExecuteProvider from '../ExecuteProvider/ExecuteProvider.ts'
import * as ExtensionHostCommandType from '../ExtensionHostCommandType/ExtensionHostCommandType.ts'

export const acceptInput = async (providerId: string, text: string): Promise<void> => {
  return ExecuteProvider.executeProvider({
    event: 'none',
    method: ExtensionHostCommandType.SourceControlAcceptInput,
    params: [providerId, text],
    // noProviderFoundMessage: 'No source control provider found',
  })
}

export const getChangedFiles = (providerId: string): Promise<readonly any[]> => {
  return ExecuteProvider.executeProvider({
    event: 'none',
    method: ExtensionHostCommandType.SourceControlGetChangedFiles,
    params: [providerId],
    // noProviderFoundMessage: 'No source control provider found',
  })
}

export const getFileBefore = (providerId: string, path: string): Promise<any> => {
  return ExecuteProvider.executeProvider({
    event: 'none',
    method: ExtensionHostCommandType.SourceControlGetFileBefore,
    params: [providerId, path],
    // noProviderFoundMessage: 'No source control provider found',
  })
}

export const getGroups = (providerId: string, path: string): Promise<any> => {
  return ExecuteProvider.executeProvider({
    event: 'none',
    method: ExtensionHostCommandType.SourceControlGetGroups,
    params: [providerId, path],
    // noProviderFoundMessage: 'No source control provider found',
  })
}

export const add = (providerId: string, path: string): Promise<void> => {
  return ExecuteProvider.executeProvider({
    event: 'none',
    method: ExtensionHostCommandType.SourceControlAdd,
    params: [providerId, path],
    // noProviderFoundMessage: 'No source control provider found',
  })
}

export const discard = (providerId: string, path: string): Promise<void> => {
  return ExecuteProvider.executeProvider({
    event: 'none',
    method: ExtensionHostCommandType.SourceControlDiscard,
    params: [providerId, path],
    // noProviderFoundMessage: 'No source control provider found',
  })
}

export const getEnabledProviderIds = (scheme: string, root: string): Promise<readonly string[]> => {
  return ExecuteProvider.executeProvider({
    event: `onSourceControl:${scheme}`,
    method: ExtensionHostCommandType.SourceControlGetEnabledProviderIds,
    params: [scheme, root],
    // noProviderFoundMessage: 'No source control provider found',
  })
}
