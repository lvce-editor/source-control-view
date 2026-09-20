import pluginTypeScript from '@babel/preset-typescript'
import { babel } from '@rollup/plugin-babel'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import { readdir, readFile, writeFile } from 'node:fs/promises'
import { transform } from 'esbuild'
import { join } from 'path'
import { rollup, type RollupOptions } from 'rollup'
import { root } from './root.ts'

const options: RollupOptions = {
  input: join(root, 'packages/source-control-worker/src/sourceControlWorkerMain.ts'),
  preserveEntrySignatures: false,
  treeshake: {
    propertyReadSideEffects: false,
  },
  output: {
    dir: join(root, '.tmp/dist/dist'),
    entryFileNames: 'sourceControlWorkerMain.js',
    format: 'es',
    compact: true,
    freeze: false,
    generatedCode: {
      constBindings: true,
      objectShorthand: true,
    },
  },
  external: ['ws', 'electron'],
  plugins: [
    babel({
      babelHelpers: 'bundled',
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      presets: [pluginTypeScript],
    }),
    nodeResolve(),
  ],
}

export const bundleJs = async (): Promise<void> => {
  const input = await rollup(options)
  // @ts-ignore
  await input.write(options.output)
  const outputDirectory = join(root, '.tmp/dist/dist')
  const outputFiles = await readdir(outputDirectory)
  await Promise.all(
    outputFiles
      .filter((file) => file.endsWith('.js'))
      .map(async (file) => {
        const filePath = join(outputDirectory, file)
        const content = await readFile(filePath, 'utf8')
        const result = await transform(content, {
          format: 'esm',
          legalComments: 'none',
          minify: true,
        })
        await writeFile(filePath, result.code)
      }),
  )
}
