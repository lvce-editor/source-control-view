import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import { openDiffEditor } from '../src/parts/OpenDiffEditor/OpenDiffEditor.ts'
import { withRendererApplicationRouting } from './test-util/WithApplicationRouting.ts'

test.each([
  [799, 'inline-diff'],
  [800, 'diff'],
  [1200, 'diff'],
])('openDiffEditor at width %i uses %s', async (width, protocol): Promise<void> => {
  using rpc = RendererWorker.registerMockRpc(
    withRendererApplicationRouting({
      'Main.openUri': async (): Promise<void> => {},
    }),
  )

  await openDiffEditor('original content', '/workspace/file.ts', width, 800, '')

  expect(rpc.invocations).toEqual([['Application.execute', '', 'Main.openUri', { uri: `${protocol}://data://original content<->/workspace/file.ts` }]])
})

test('openDiffEditor targets the originating application', async (): Promise<void> => {
  using rpc = RendererWorker.registerMockRpc(
    withRendererApplicationRouting({
      'Application.execute': async (): Promise<void> => {},
    }),
  )

  await openDiffEditor('', '/workspace/new.ts', 800, 800, 'preview-1')

  expect(rpc.invocations).toEqual([['Application.execute', 'preview-1', 'Main.openUri', { uri: 'diff://data://<->/workspace/new.ts' }]])
})

test('openDiffEditor propagates editor failures', async (): Promise<void> => {
  using rpc = RendererWorker.registerMockRpc(
    withRendererApplicationRouting({
      'Main.openUri': async (): Promise<never> => {
        throw new Error('editor unavailable')
      },
    }),
  )

  await expect(openDiffEditor('before', '/workspace/file.ts', 800, 800, '')).rejects.toThrow('editor unavailable')
  expect(rpc.invocations).toHaveLength(1)
})
