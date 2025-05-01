import { getPath } from '../GetPath/GetPath.ts'

export const getPaths = (items: readonly any[]): readonly string[] => {
  return items.map(getPath)
}
