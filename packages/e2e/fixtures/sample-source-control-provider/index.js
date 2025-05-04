const id = 'sample-source-control'
const label = 'Sample Source Control'
const rootUri = ''

const groups = [
  {
    id: 'changes',
    label: 'Changes',
    hideWhenEmpty: true,
  },
  {
    id: 'staged',
    label: 'Staged Changes',
    hideWhenEmpty: true,
  },
]

const getChangedFiles = () => {
  if (!rootUri) {
    return []
  }
}

const stage = (path) => {}

const unstage = (path) => {}

const acceptInput = () => {
  // No-op for this sample provider
}

const getFileBefore = (path) => {
  // Return empty string for this sample provider
  return ''
}

const dispose = () => {}

const sampleSourceControlProvider = {
  id,
  label,
  rootUri,
  groups,
  getChangedFiles,
  stage,
  unstage,
  acceptInput,
  getFileBefore,
  dispose,
}

export function activate(context) {
  // @ts-ignore
  vscode.registerSourceControlProvider(sampleSourceControlProvider)
}

export function deactivate() {}
