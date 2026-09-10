import { expect, test } from '@jest/globals'
import { IconThemeWorker, RendererWorker } from '@lvce-editor/rpc-registry'
import { requestFileIcons } from '../src/parts/RequestFileIcons/RequestFileIcons.ts'

test('requests file and folder icons directly from the icon theme worker', async (): Promise<void> => {
  using rendererRpc = RendererWorker.registerMockRpc({})
  using iconRpc = IconThemeWorker.registerMockRpc({
    'IconTheme.getIcons': async (): Promise<readonly string[]> => ['file.svg', 'folder.svg'],
  })
  const requests = [
    { name: 'index.ts', type: 1 },
    { name: 'src', type: 2 },
  ]

  await expect(requestFileIcons(requests)).resolves.toEqual(['file.svg', 'folder.svg'])
  expect(iconRpc.invocations).toEqual([['IconTheme.getIcons', requests]])
  expect(rendererRpc.invocations).toEqual([])
})

test('propagates icon theme worker errors', async (): Promise<void> => {
  using rendererRpc = RendererWorker.registerMockRpc({})
  using iconRpc = IconThemeWorker.registerMockRpc({
    'IconTheme.getIcons': async (): Promise<never> => {
      throw new Error('Icon theme unavailable')
    },
  })

  await expect(requestFileIcons([{ name: 'index.ts', type: 1 }])).rejects.toThrow('Icon theme unavailable')
  expect(iconRpc.invocations).toHaveLength(1)
  expect(rendererRpc.invocations).toEqual([])
})
