import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { stripTypeScriptTypes } from 'node:module'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
if (!process.argv[2]) throw new Error('Pass a disposable LVCE application checkout')
const app = resolve(process.argv[2])
const tests = join(app, 'packages/extension-host-worker-tests')
const name = 'viewlet.source-control-native-interactions'
if (process.argv.includes('--clean')) {
  await rm(join(tests, 'src', `${name}.js`), { force: true })
  await rm(join(tests, 'fixtures/sample-source-control-provider'), { force: true, recursive: true })
} else {
  await mkdir(join(tests, 'fixtures'), { recursive: true })
  await cp(join(here, '../e2e/fixtures/sample-source-control-provider'), join(tests, 'fixtures/sample-source-control-provider'), { recursive: true })
  const source = await readFile(join(here, 'native-src', `${name}.ts`), 'utf8')
  await writeFile(join(tests, 'src', `${name}.js`), stripTypeScriptTypes(source, { mode: 'transform' }))
}
