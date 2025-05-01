import * as ExtensionHostShared from '../ExecuteProvider/ExecuteProvider.ts'
import * as ExtensionHostCommandType from '../ExtensionHostCommandType/ExtensionHostCommandType.ts'

export const executeCommand = (id: string, ...args: readonly any[]): Promise<void> => {
  return ExtensionHostShared.executeProvider({
    event: `onCommand:${id}`,
    method: ExtensionHostCommandType.CommandExecute,
    params: [id, ...args],
  })
}
