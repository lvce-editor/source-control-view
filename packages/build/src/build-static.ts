import { cp, readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { build } from 'esbuild'
import { root } from './root.ts'

const sourceControlFixtures = ['sample-source-control-provider', 'sample-source-control-provider-load-error', 'sample-source-control-provider-stage-error']

await Promise.all(
  sourceControlFixtures.map((fixture) =>
    build({
      bundle: true,
      entryPoints: [join(root, 'packages', 'e2e', 'fixtures', fixture, 'index.ts')],
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

const rendererWorkerPath = join(root, 'dist', commitHash, 'packages', 'renderer-worker', 'dist', 'rendererWorkerMain.js')

export const getRemoteUrl = (path: string): string => {
  const url = pathToFileURL(path).toString().slice(8)
  return `/remote/${url}`
}

const content = await readFile(rendererWorkerPath, 'utf8')
const workerPath = join(root, '.tmp/dist/dist/sourceControlWorkerMain.js')
const remoteUrl = getRemoteUrl(workerPath)

if (content.includes('// const sourceControlWorkerUrl = ')) {
  const occurrence = `// const sourceControlWorkerUrl = \`\${assetDir}/packages/source-control-worker/dist/sourceControlWorkerMain.js\`
const sourceControlWorkerUrl = \`${remoteUrl}\``
  const replacement = `const sourceControlWorkerUrl = \`\${assetDir}/packages/source-control-worker/dist/sourceControlWorkerMain.js\``
  const newContent = content.replace(occurrence, replacement)
  await writeFile(rendererWorkerPath, newContent)
}

await cp(join(root, 'dist'), join(root, '.tmp', 'static'), { recursive: true })
