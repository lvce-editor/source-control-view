import type { IconRequest } from '../IconRequest/IconRequest.ts'
import * as ParentRpc from '../ParentRpc/ParentRpc.ts'

export const requestFileIcons = async (requests: readonly IconRequest[]): Promise<readonly string[]> => {
  const results = await ParentRpc.invoke('IconTheme.getIcons', requests)
  return results
}
