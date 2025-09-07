import * as SourceControl from '../SourceControl/SourceControl.ts'

export const getGroups = async (enabledProviderIds: readonly string[]): Promise<any> => {
  const allGroups = []
  for (const providerId of enabledProviderIds) {
    // @ts-ignore
    const groups = await SourceControl.getGroups(providerId)
    allGroups.push(...groups)
  }
  console.log({ allGroups, enabledProviderIds })
  return {
    allGroups,
    gitRoot: '',
  }
}
