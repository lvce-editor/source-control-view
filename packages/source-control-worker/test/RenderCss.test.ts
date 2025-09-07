import { test, expect } from '@jest/globals'
import { ViewletCommand } from '@lvce-editor/constants'
import type { SourceControlState } from '../src/parts/SourceControlState/SourceControlState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as RenderCss from '../src/parts/RenderCss/RenderCss.ts'

test('renderCss - returns correct command with CSS', () => {
  const oldState: SourceControlState = createDefaultState()
  const newState: SourceControlState = {
    ...createDefaultState(),
    id: 1,
    inputBoxHeight: 30,
  }

  const result = RenderCss.renderCss(oldState, newState)

  expect(result).toEqual([
    ViewletCommand.SetCss,
    1,
    `:root {
  --SourceControlInputHeight: 30px;
}
`,
  ])
})

test('renderCss - handles different input box heights', () => {
  const oldState: SourceControlState = createDefaultState()
  const newState: SourceControlState = {
    ...createDefaultState(),
    id: 2,
    inputBoxHeight: 50,
  }

  const result = RenderCss.renderCss(oldState, newState)

  expect(result).toEqual([
    ViewletCommand.SetCss,
    2,
    `:root {
  --SourceControlInputHeight: 50px;
}
`,
  ])
})

test('renderCss - handles zero height', () => {
  const oldState: SourceControlState = createDefaultState()
  const newState: SourceControlState = {
    ...createDefaultState(),
    id: 3,
    inputBoxHeight: 0,
  }

  const result = RenderCss.renderCss(oldState, newState)

  expect(result).toEqual([
    ViewletCommand.SetCss,
    3,
    `:root {
  --SourceControlInputHeight: 0px;
}
`,
  ])
})

test('renderCss - handles large height values', () => {
  const oldState: SourceControlState = createDefaultState()
  const newState: SourceControlState = {
    ...createDefaultState(),
    id: 4,
    inputBoxHeight: 200,
  }

  const result = RenderCss.renderCss(oldState, newState)

  expect(result).toEqual([
    ViewletCommand.SetCss,
    4,
    `:root {
  --SourceControlInputHeight: 200px;
}
`,
  ])
})
