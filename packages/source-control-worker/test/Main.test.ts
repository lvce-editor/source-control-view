import { expect, test } from '@jest/globals'
import * as Main from '../src/parts/Main/Main.ts'

test.skip('main calls listen', async () => {
  await Main.main()
})

test.skip('handles listen error', async () => {
  await expect(Main.main()).rejects.toThrow()
})
