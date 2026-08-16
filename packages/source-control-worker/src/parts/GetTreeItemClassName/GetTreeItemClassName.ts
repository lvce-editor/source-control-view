import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'
import * as TreeItemPadding from '../TreeItemPadding/TreeItemPadding.ts'

export const getTreeItemClassName = (indent: number): string => {
  let className = ClassNames.TreeItem
  className = MergeClassNames.mergeClassNames(className, `Indent-${indent}`)
  className = MergeClassNames.mergeClassNames(className, `IndentRight-${TreeItemPadding.PaddingRight}`)
  return className
}
