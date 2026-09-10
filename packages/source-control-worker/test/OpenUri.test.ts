import { expect, test } from '@jest/globals'
import { RendererWorker as ParentRpc } from '@lvce-editor/rpc-registry'
import { openUri } from '../src/parts/OpenUri/OpenUri.ts'
import { withRendererApplicationRouting } from './test-util/WithApplicationRouting.ts'

test('openUri', async (): Promise<void> => {
  const commandMap = {
    'Main.openUri': async (): Promise<void> => {},
  }
  using mockRpc = ParentRpc.registerMockRpc(withRendererApplicationRouting(commandMap))
  await openUri('test-uri', '')
  expect(mockRpc.invocations).toEqual([['Application.execute', '', 'Main.openUri', { uri: 'test-uri' }]])
})
