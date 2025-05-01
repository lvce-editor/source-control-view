import * as Assert from '../Assert/Assert.ts'
import * as ExtensionHostSourceControl from '../ExtensionHostSourceControl/ExtensionHostSourceControl.ts'

export const state = {
  enabledProviders: [],
  initialized: false,
}

export const acceptInput = (providerId: string, text: string): Promise<void> => {
  Assert.string(providerId)
  Assert.string(text)
  return ExtensionHostSourceControl.acceptInput(providerId, text)
}

export const getChangedFiles = (providerId: string): Promise<readonly any[]> => {
  return ExtensionHostSourceControl.getChangedFiles(providerId)
}

export const getFileBefore = (providerId: string, file: string): Promise<any> => {
  return ExtensionHostSourceControl.getFileBefore(providerId, file)
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

export const getEnabledProviderIds = (scheme: string, root: string): Promise<readonly string[]> => {
  Assert.string(scheme)
  Assert.string(root)
  return ExtensionHostSourceControl.getEnabledProviderIds(scheme, root)
}

export const getGroups = (providerId: string, root: string): Promise<any> => {
  return ExtensionHostSourceControl.getGroups(providerId, root)
}
