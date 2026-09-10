import { activate, registerCommand } from '@lvce-editor/api'

await activate()
registerCommand({
  id: 'sampleInputActions.generate',
  execute: (message: string): string => `Suggested: ${message}`,
})
