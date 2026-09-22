import { test, expect } from '@jest/globals'
import { DirentType } from '@lvce-editor/constants'
import type { FileIconCache } from '../src/parts/FileIconCache/FileIconCache.ts'
import type { IconRequest } from '../src/parts/IconRequest/IconRequest.ts'
import * as UpdateIconCache from '../src/parts/UpdateIconCache/UpdateIconCache.ts'

test('updateIconCache - empty requests', () => {
  const cache: FileIconCache = {}
  const requests: readonly IconRequest[] = []
  const newIcons: readonly string[] = []
  expect(UpdateIconCache.updateIconCache(cache, requests, newIcons)).toBe(cache)
})

test('updateIconCache - new icons', () => {
  const cache: FileIconCache = {
    'file1.txt': 'icon1',
  }
  const requests: readonly IconRequest[] = [{ name: 'file2.txt', path: '/test/file2.txt', type: DirentType.File }]
  const newIcons: readonly string[] = ['icon2']
  expect(UpdateIconCache.updateIconCache(cache, requests, newIcons)).toEqual({
    '/test/file2.txt': 'icon2',
    'file1.txt': 'icon1',
  })
})

test('updateIconCache - immutability', () => {
  const cache: FileIconCache = { existing: 'icon' }
  const requests: readonly IconRequest[] = [{ name: 'file.txt', path: '/test/file.txt', type: DirentType.File }]
  const newIcons: readonly string[] = ['new-icon']
  const result = UpdateIconCache.updateIconCache(cache, requests, newIcons)
  expect(result).not.toBe(cache)
  expect(cache).toEqual({ existing: 'icon' })
})

test('updateIconCache - keeps expanded directory icons separate', () => {
  const requests: readonly IconRequest[] = [{ expanded: true, name: 'src', path: '/test/src', type: 2 }]
  const result = UpdateIconCache.updateIconCache({}, requests, ['folder-icon-expanded'])
  expect(result).toEqual({ '/test/src#expanded': 'folder-icon-expanded' })
})
