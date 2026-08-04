import { expect, test } from '@jest/globals'
import { PlatformType } from '@lvce-editor/constants'
import { getSourceControlIconDefinitions } from '../src/parts/GetSourceControlIconDefinitions/GetSourceControlIconDefinitions.ts'

test('returns source control icon urls for a web extension', () => {
  const extensions = [
    {
      id: 'builtin.git',
      'source-control-icons': ['icons/status-modified.svg', 'icons/status-added.svg'],
      uri: 'https://example.com/extensions/builtin.git',
    },
  ]

  expect(getSourceControlIconDefinitions(extensions, 'git', PlatformType.Web)).toEqual([
    'https://example.com/extensions/builtin.git/icons/status-modified.svg',
    'https://example.com/extensions/builtin.git/icons/status-added.svg',
  ])
})

test('converts desktop file urls to remote urls', () => {
  const extensions = [
    {
      id: 'builtin.git',
      'source-control-icons': ['icons/status-modified.svg'],
      uri: 'file:///usr/lib/lvce-editor/extensions/builtin.git',
    },
  ]

  expect(getSourceControlIconDefinitions(extensions, 'git', PlatformType.Electron)).toEqual([
    '/remote/usr/lib/lvce-editor/extensions/builtin.git/icons/status-modified.svg',
  ])
})

test('returns no icons when the provider does not match', () => {
  const extensions = [
    {
      id: 'builtin.git',
      'source-control-icons': ['icons/status-modified.svg'],
      uri: 'https://example.com/extensions/builtin.git',
    },
  ]

  expect(getSourceControlIconDefinitions(extensions, 'other', PlatformType.Web)).toEqual([])
})

test('ignores malformed icon definitions', () => {
  expect(getSourceControlIconDefinitions([{ id: 'builtin.git', 'source-control-icons': undefined, uri: 'https://example.com' }], 'git', PlatformType.Web)).toEqual([])
})
