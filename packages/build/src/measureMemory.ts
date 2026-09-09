import { measureMemory } from '@lvce-editor/measure-memory'
import { join } from 'node:path'
import { root } from './root.ts'

const threshold = 508_000

const instantiations = 5600

const instantiationsPath = join(root, 'packages', 'source-control-worker')

const workerPath = join(root, '.tmp/dist/dist/sourceControlWorkerMain.js')

const playwrightPath = import.meta.resolve('../../../node_modules/playwright/index.mjs')

await measureMemory({
  playwrightPath,
  workerPath,
  threshold,
  instantiations,
  instantiationsPath,
})
