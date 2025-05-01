import * as ExtensionHost from '../ExtensionHost/ExtensionHost.ts'

export const getExtensions = async (): Promise<readonly any[]> => {
  return ExtensionHost.invoke('Extensions.getExtensions')
}
