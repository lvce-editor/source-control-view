import { spawnSync } from 'node:child_process'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const browserTest = fileURLToPath(new URL('./test-native-source-control.mjs', import.meta.url))
for (let iteration = 1; iteration <= 20; iteration++) {
  console.info(`Native source control iteration ${iteration}/20`)
  const result = spawnSync(
    process.execPath,
    ['src/_all.js', '--headless', '--test-name-prefix=viewlet.source-control-native-interactions', `--browser-test=${browserTest}`],
    {
      env: {
        ...process.env,
        ...(process.env.SOURCE_CONTROL_NATIVE_EVIDENCE_DIR
          ? { SOURCE_CONTROL_NATIVE_EVIDENCE_DIR: join(process.env.SOURCE_CONTROL_NATIVE_EVIDENCE_DIR, `iteration-${iteration}`) }
          : {}),
      },
      stdio: 'inherit',
    },
  )
  if (result.error) throw result.error
  if (result.status !== 0) throw new Error(`Native source control iteration ${iteration} failed (${result.signal || result.status})`)
}
