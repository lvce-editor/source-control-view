import * as SourceControl from '../SourceControl/SourceControl.ts'

export const getGroups = async (enabledProviderIds: readonly string[], root: string, assetDir: string, platform: number, applicationId?: string): Promise<any> => {
  const allGroups = []
  for (const providerId of enabledProviderIds) {
    const groups = await SourceControl.getGroups(providerId, root, assetDir, platform, applicationId)
    allGroups.push(...groups)
  }
  return {
    allGroups,
    gitRoot: '',
  }
}
