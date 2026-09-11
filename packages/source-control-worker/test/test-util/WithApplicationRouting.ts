import { expect } from '@jest/globals'
import { ExtensionHost } from '@lvce-editor/rpc-registry'

// Model extension management dispatching a call to the application's extension host.
export const withApplicationRouting = (
  commandMap: Readonly<Record<string, (...args: readonly any[]) => any>>,
): Readonly<Record<string, (...args: readonly any[]) => any>> => ({
  'Extensions.invokeForApplication': async (applicationId: string, method: string, ...args: readonly any[]): Promise<any> => {
    expect(applicationId).toBe('')
    if (Object.hasOwn(commandMap, method)) {
      return commandMap[method](...args)
    }
    return ExtensionHost.invoke(method, ...args)
  },
  ...commandMap,
})

export const withRendererApplicationRouting = (
  commandMap: Readonly<Record<string, (...args: readonly any[]) => any>>,
): Readonly<Record<string, (...args: readonly any[]) => any>> => ({
  'Application.execute': async (applicationId: string, method: string, ...args: readonly any[]): Promise<any> => {
    expect(applicationId).toBe('')
    return commandMap[method](...args)
  },
  ...commandMap,
})
