const state = {
  width: 0,
  height: 0,
}

export const get = (): any => {
  return {
    width: state.width,
    height: state.height,
  }
}

export const set = (width: number, height: number): void => {
  ;(state.width = width), (state.height = height)
}
