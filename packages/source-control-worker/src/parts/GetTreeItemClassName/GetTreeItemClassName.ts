import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'

export const getTreeItemClassName = (indent: number, active = false): string => {
  const activeClassName = active ? 'TreeItemActive' : ''
  return MergeClassNames.mergeClassNames(ClassNames.TreeItem, `Indent-${indent}`, 'IndentRight-12', activeClassName)
}
