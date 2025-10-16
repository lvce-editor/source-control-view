export const getActualDecorationIcon = (iconDefinitions: any, icon: string | number): string => {
  if (typeof icon === 'number') {
    return iconDefinitions[icon]
  }
  return icon
}
