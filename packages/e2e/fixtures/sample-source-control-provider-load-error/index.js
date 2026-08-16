import { activate as activateExtensionApi, registerSourceControlProvider } from '@lvce-editor/api'

const sampleSourceControlProvider = {
  id: 'sample-source-control-provider-load-error',
  label: 'Sample Source Control',
  rootUri: '',
  getGroups() {
    throw new Error('Unable to read repository state')
  },
  getChangedFiles() {
    return []
  },
  dispose() {},
  isActive() {
    return true
  },
}

const activate = async () => {
  await activateExtensionApi()
  registerSourceControlProvider(sampleSourceControlProvider)
}

await activate()
