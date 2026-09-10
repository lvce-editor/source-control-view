import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'
import { handleClickFile } from '../HandleClickFile/HandleClickFile.ts'

export const openChanges = async (state: SourceControlState, uri: string): Promise<SourceControlState> => {
  const { items, root } = state
  const item = items.find((item) => `${root}/${item.file}` === uri)
  return item ? handleClickFile(state, item) : state
}
