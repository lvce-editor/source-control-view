import { expect, test } from '@jest/globals'
import { IconThemeWorker } from '@lvce-editor/rpc-registry'
import type { DisplayItem } from '../src/parts/DisplayItem/DisplayItem.ts'
import { getVisibleSourceControlItemsWithIcons } from '../src/parts/GetVisibleSourceControlItemsWithIcons/GetVisibleSourceControlItemsWithIcons.ts'

const createDisplayItem = (index: number): DisplayItem => ({
  badgeCount: 0,
  decorationIcon: '',
  decorationIconTitle: '',
  decorationStrikeThrough: false,
  detail: '',
  file: `/workspace/file-${index}.txt`,
  groupId: 'changes',
  icon: '',
  label: `file-${index}.txt`,
  posInSet: index + 1,
  setSize: 8329,
  type: 7,
})

test('getVisibleSourceControlItemsWithIcons - only requests uncached visible items', async (): Promise<void> => {
  using iconRpc = IconThemeWorker.registerMockRpc({
    'IconTheme.getIcons': async (requests: readonly any[]): Promise<readonly string[]> => requests.map((request) => `${request.name}-icon`),
  })
  const items = Array.from({ length: 8329 }, (_, index) => createDisplayItem(index))

  const first = await getVisibleSourceControlItemsWithIcons(items, 0, 20, {}, {})
  expect(iconRpc.invocations[0][1]).toHaveLength(20)
  expect(Object.keys(first.fileIconCache)).toHaveLength(20)

  const second = await getVisibleSourceControlItemsWithIcons(items, 20, 40, {}, first.fileIconCache)
  expect(iconRpc.invocations[1][1]).toHaveLength(20)
  expect(Object.keys(second.fileIconCache)).toHaveLength(40)

  await getVisibleSourceControlItemsWithIcons(items, 0, 20, {}, second.fileIconCache)
  expect(iconRpc.invocations).toHaveLength(2)
})
