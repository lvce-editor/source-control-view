import { PlatformType } from '@lvce-editor/constants'

const getProviderId = (extension: any): string => {
  if (typeof extension?.id !== 'string') {
    return ''
  }
  const parts = extension.id.split('.')
  return parts[1] || ''
}

const getRemotePath = (uri: string): string => {
  const withoutPrefix = uri.startsWith('file://') ? uri.slice('file://'.length) : uri
  const normalized = withoutPrefix.replaceAll('\\', '/')
  return normalized.startsWith('/') ? normalized : `/${normalized}`
}

const getIconUrl = (extensionUri: string, icon: string, platform: number): string => {
  const uri = `${extensionUri}/${icon}`
  if (uri.startsWith('http://') || uri.startsWith('https://')) {
    return uri
  }
  if (platform === PlatformType.Electron || platform === PlatformType.Remote) {
    return `/remote${getRemotePath(uri)}`
  }
  return uri
}

export const getSourceControlIconDefinitions = (extensions: readonly any[], providerId: string, platform: number): readonly string[] => {
  for (const extension of extensions) {
    if (getProviderId(extension) !== providerId || !Array.isArray(extension?.['source-control-icons']) || typeof extension.uri !== 'string') {
      continue
    }
    return extension['source-control-icons'].filter((icon: unknown) => typeof icon === 'string').map((icon: string) => getIconUrl(extension.uri, icon, platform))
  }
  return []
}
