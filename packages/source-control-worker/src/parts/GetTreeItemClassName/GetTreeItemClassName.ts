import * as ClassNames from '../ClassNames/ClassNames.ts'

export const getTreeItemClassName = (indent: number): string => {
  return `${ClassNames.TreeItem} Indent-${indent} IndentRight-12`
}
