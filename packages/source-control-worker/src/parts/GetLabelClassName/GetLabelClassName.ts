import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'

export const getLabelClassName = (decorationStrikeThrough: boolean): string => {
  let className = MergeClassNames.mergeClassNames(ClassNames.Label, ClassNames.Grow)
  if (decorationStrikeThrough) {
    className = MergeClassNames.mergeClassNames(className, ClassNames.StrikeThrough)
  }
  return className
}
