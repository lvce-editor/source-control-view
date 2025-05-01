import * as ClassNames from '../ClassNames/ClassNames.ts'

export const getLabelClassName = (decorationStrikeThrough: boolean): string => {
  let className = ClassNames.Label + ' Grow'
  if (decorationStrikeThrough) {
    className += ` ${ClassNames.StrikeThrough}`
  }
  return className
}
