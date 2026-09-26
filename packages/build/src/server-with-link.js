import { createRequire } from 'node:module'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..', '..')
const require = createRequire(import.meta.url)
const serverPath = require.resolve('@lvce-editor/server/bin/server.js')

process.argv.push(`--link=${join(root, '.tmp', 'dist')}`)
await import(serverPath)
