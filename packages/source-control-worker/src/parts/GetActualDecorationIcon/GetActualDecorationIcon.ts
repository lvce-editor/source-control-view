export const getActualDecorationIcon = (iconDefinitions: any, icon: string | number): string => {
  if (typeof icon === 'number') {
    const value = iconDefinitions[icon]
    if (!value) {
      return 'not-available'
    }
    return value
  }
  return icon
}
