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
  // Built application extensions also contribute actions to Git's group IDs.
  // Give this disposable provider its own groups so native button names are unique.
  const fixture = join(tests, 'fixtures/sample-source-control-provider')
  const manifestPath = join(fixture, 'extension.json')
  const manifest = JSON.parse(await readFile(manifestPath, 'utf8'))
  manifest['source-control-actions'] = Object.fromEntries(Object.entries(manifest['source-control-actions']).map(([context, actions]) => [`native-${context}`, actions]))
  await writeFile(manifestPath, JSON.stringify(manifest, null, 2))
  const providerPath = join(fixture, 'src/index.ts')
  const provider = await readFile(providerPath, 'utf8')
  await writeFile(providerPath, provider.replace(/id: '(merge|index|working-tree|untracked)'/g, "id: 'native-$1'"))
  const source = await readFile(join(here, 'native-src', `${name}.ts`), 'utf8')
  await writeFile(join(tests, 'src', `${name}.js`), stripTypeScriptTypes(source))
}
