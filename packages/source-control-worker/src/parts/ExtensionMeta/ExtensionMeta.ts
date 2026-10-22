import * as ApplicationExtensionRpc from '../ApplicationExtensionRpc/ApplicationExtensionRpc.ts'

// Extension management owns compatibility, including Node tools enabled by a
// remote workspace transport. Keep the metadata it selected for this application.
export const getExtensions = async (assetDir: string, platform: number, applicationId: string): Promise<readonly any[]> => {
  return ApplicationExtensionRpc.invoke(applicationId, 'Extensions.getAllExtensions', assetDir, platform)
}
