import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'

export const getTreeItemClassName = (indent: number, selected = false): string => {
  let className = MergeClassNames.mergeClassNames(ClassNames.TreeItem, `Indent-${indent}`, 'IndentRight-12')
  if (selected) {
    className = MergeClassNames.mergeClassNames(className, ClassNames.TreeItemActive)
  }
  return className
}
