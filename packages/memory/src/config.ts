import { join } from 'node:path'
import { root } from './root.ts'

export const threshold = 455_000

export const instantiations = 7000

export const instantiationsPath = join(root, 'packages', 'source-control-worker')

export const workerPath = join(root, '.tmp/dist/dist/sourceControlWorkerMain.js')

export const playwrightPath = new URL('../../e2e/node_modules/playwright/index.mjs', import.meta.url).toString()
