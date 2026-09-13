import { activate, executeCommand, registerCommand, registerSourceControlProvider } from '@lvce-editor/api'

let inProgress = false
await activate()
const provider = {
  id: 'progress',
  isActive: () => true,
  getChangedFiles: () => [],
  getProgress: () => inProgress,
}
registerSourceControlProvider(provider)
for (const [id, value] of [
  ['progress.begin', true],
  ['progress.finish', false],
] as const) {
  registerCommand({
    id,
    async execute() {
      inProgress = value
      await executeCommand('Layout.handleSourceControlProgressChange')
    },
  })
}
