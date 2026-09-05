import * as ExtensionHostShared from '../ExecuteProvider/ExecuteProvider.ts'
import * as ExtensionHostCommandType from '../ExtensionHostCommandType/ExtensionHostCommandType.ts'

const executeCommand = (id: string, assetDir: string, platform: number, ...args: readonly any[]): Promise<void> => {
  return ExtensionHostShared.executeProvider({
    assetDir,
    event: `onCommand:${id}`,
    method: ExtensionHostCommandType.CommandExecute,
    params: [id, ...args],
    platform,
  })
}

export const executeCommandForApplication = (
  applicationId: string | undefined,
  id: string,
  assetDir: string,
  platform: number,
  ...args: readonly any[]
): Promise<void> => {
  if (applicationId === undefined) {
    return executeCommand(id, assetDir, platform, ...args)
  }
  return ExtensionHostShared.executeProvider({
    applicationId,
    assetDir,
    event: 'onCommand:' + id,
    method: ExtensionHostCommandType.CommandExecute,
    params: [id, ...args],
    platform,
  })
}
