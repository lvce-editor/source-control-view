import { expect, test } from '@jest/globals'
import { getMenuEntries } from '../src/parts/GetMenuEntries/GetMenuEntries.ts'

test('reveal in explorer entry', () => {
  const uri = '/test/src/test.ts'
  const entries = getMenuEntries(uri)
  const entry = entries.find((item) => item.id === 'revealInExplorerView')

  expect(entry).toEqual({
    args: [uri],
    command: 'SourceControl.revealInExplorer',
    flags: 0,
    id: 'revealInExplorerView',
    label: 'Reveal in Explorer View',
  })
})
