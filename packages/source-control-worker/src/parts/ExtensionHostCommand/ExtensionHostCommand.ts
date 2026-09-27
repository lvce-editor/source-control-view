import * as ExtensionHostShared from '../ExecuteProvider/ExecuteProvider.ts'
import * as ExtensionHostCommandType from '../ExtensionHostCommandType/ExtensionHostCommandType.ts'

export const executeCommandForApplication = (applicationId: string, id: string, assetDir: string, platform: number, ...args: readonly any[]): Promise<unknown> => {
  return ExtensionHostShared.executeProvider({
    applicationId,
    assetDir,
    event: 'onCommand:' + id,
    method: ExtensionHostCommandType.CommandExecute,
    params: [id, ...args],
    platform,
  })
}
