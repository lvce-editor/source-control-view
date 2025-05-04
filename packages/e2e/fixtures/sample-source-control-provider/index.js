const id = 'sample-source-control'
const label = 'Sample Source Control'
const rootUri = ''

const iconRoot = new URL('./icons/dark', import.meta.url).toString()

const IconType = {
  Modified: `${iconRoot}/status-modified.svg`,
  Added: `${iconRoot}/status-added.svg`,
  Deleted: `${iconRoot}/status-deleted.svg`,
  Renamed: `${iconRoot}/status-renamed.svg`,
  Copied: `${iconRoot}/status-copied.svg`,
  Untracked: `${iconRoot}/status-untracked.svg`,
  Ignored: `${iconRoot}/status-ignored.svg`,
  Conflict: `${iconRoot}/status-conflict.svg`,
}

const toItem = (dirent) => {
  return {
    file: dirent.name,
    icon: IconType.Untracked,
    iconTitle: '',
    type: 8,
  }
}

const getGroups = async () => {
  const root = vscode.getWorkspaceFolder()
  const dirents = await vscode.readDirWithFileTypes(root)
  const items = dirents.map(toItem)
  const groups = [
    {
      id: 'changes',
      label: 'Changes',
      hideWhenEmpty: true,
      items: items,
    },
    {
      id: 'staged',
      label: 'Staged Changes',
      hideWhenEmpty: true,
      items: [],
    },
  ]
  return groups
}

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

const isActive = () => {
  return true
}

const sampleSourceControlProvider = {
  id,
  label,
  rootUri,
  getGroups,
  getChangedFiles,
  stage,
  unstage,
  acceptInput,
  getFileBefore,
  dispose,
  isActive,
}

export function activate(context) {
  // @ts-ignore
  vscode.registerSourceControlProvider(sampleSourceControlProvider)
}

export function deactivate() {}
