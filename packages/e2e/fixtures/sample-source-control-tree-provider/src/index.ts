import { activate as activateExtensionApi, registerSourceControlProvider } from '@lvce-editor/api'

const id = 'sample-source-control-tree-provider'

const sampleSourceControlProvider = {
  id,
  label: 'Sample Source Control Tree Provider',
  rootUri: '',
  getGroups() {
    return [
      {
        id: 'working-tree',
        label: 'Changes',
        items: [
          { file: 'electron-4/package.json', icon: 1, iconTitle: 'Added', type: 8 },
          { file: 'electron-44-performance/mainProcess.js', icon: 0, iconTitle: 'Modified', type: 8 },
          { file: 'electron-44-performance/nested/package.json', icon: 1, iconTitle: 'Added', type: 8 },
          { file: 'electron-44-performance/package.json', icon: 0, iconTitle: 'Modified', type: 8 },
          { file: 'electron-6/package.json', icon: 1, iconTitle: 'Added', type: 8 },
        ],
      },
    ]
  },
  getChangedFiles() {
    return []
  },
  isActive() {
    return true
  },
}

const activate = async () => {
  await activateExtensionApi()
  registerSourceControlProvider(sampleSourceControlProvider)
}

await activate()
