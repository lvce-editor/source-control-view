import { expect, test } from '@jest/globals'
import { commandMap } from '../src/parts/CommandMap/CommandMap.ts'
import { create2 } from '../src/parts/Create2/Create2.ts'
import { get } from '../src/parts/SourceControlStates/SourceControlStates.ts'

test('disposing a preview releases its view state without removing the source application', (): void => {
  create2(501, '', 0, 0, 240, 500, 'memfs:///source', 1, '', 'source')
  create2(502, '', 0, 0, 240, 500, 'memfs:///preview', 1, '', 'preview')
  commandMap['SourceControl.dispose'](502)
  expect(get(502)).toBeUndefined()
  expect(get(501).newState.applicationId).toBe('source')
  commandMap['SourceControl.dispose'](502)
  create2(503, '', 0, 0, 240, 500, 'memfs:///preview', 1, '', 'preview')
  expect(get(503).newState.applicationId).toBe('preview')
  commandMap['SourceControl.dispose'](501)
  commandMap['SourceControl.dispose'](503)
})
