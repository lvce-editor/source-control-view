import { cp, readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { build } from 'esbuild'
import { root } from './root.ts'

const sourceControlFixtures = ['sample-source-control-provider', 'sample-source-control-provider-load-error', 'sample-source-control-provider-stage-error']
const bundledFixtureEntryPoint = 'dist/index.js'

await Promise.all(
  sourceControlFixtures.map((fixture) =>
    build({
      bundle: true,
      entryPoints: [join(root, 'packages', 'e2e', 'fixtures', fixture, 'src', 'index.ts')],
      external: ['electron', 'node:buffer', 'node:worker_threads'],
      format: 'esm',
      outfile: join(root, 'packages', 'e2e', 'fixtures', fixture, 'dist', 'index.js'),
      platform: 'browser',
    }),
  ),
)

const sharedProcessUrl = import.meta.resolve('@lvce-editor/shared-process')
const sharedProcess = await import(sharedProcessUrl)

process.env.PATH_PREFIX = '/source-control-view'
const { commitHash } = await sharedProcess.exportStatic({
  root,
  extensionPath: '',
  testPath: 'packages/e2e',
})

const updateStaticFixtureEntryPoint = async (fixture: string): Promise<void> => {
  const fixturePath = join(root, 'dist', commitHash, 'packages', 'extension-host-worker-tests', 'fixtures', fixture)
  const extensionJsonPath = join(fixturePath, 'extension.json')
  const extensionJson = JSON.parse(await readFile(extensionJsonPath, 'utf8')) as Record<string, unknown>
  extensionJson.browser = bundledFixtureEntryPoint
  const extensionJsonContent = `${JSON.stringify(extensionJson, null, 2)}\n`
  await writeFile(extensionJsonPath, extensionJsonContent)

  const fileMapPath = join(fixturePath, 'fileMap.json')
  const fileMap = JSON.parse(await readFile(fileMapPath, 'utf8')) as Record<string, string>
  fileMap['extension.json'] = extensionJsonContent
  await writeFile(fileMapPath, `${JSON.stringify(fileMap, null, 2)}\n`)
}

await Promise.all(sourceControlFixtures.map(updateStaticFixtureEntryPoint))

await cp(join(root, '.tmp', 'dist', 'dist'), join(root, 'dist', commitHash, 'packages', 'source-control-worker', 'dist'), { recursive: true })

await cp(join(root, 'dist'), join(root, '.tmp', 'static'), { recursive: true })
