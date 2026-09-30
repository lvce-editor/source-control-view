const currentUrl = new URL(import.meta.url)
const assetDir = currentUrl.pathname.startsWith('/remote/') ? '' : currentUrl.pathname.slice(0, currentUrl.pathname.indexOf('/packages/'))
const { WebWorkerRpcClient } = await import(`${assetDir}/js/lvce-editor-rpc.js`)

const commandMap = {
  'ExtensionApi.executeSourceControlGetBadgeCount'() {
    return 1
  },
  'ExtensionApi.executeSourceControlGetFeatures'() {
    return {}
  },
  'ExtensionApi.executeSourceControlGetGroups'(_id, root) {
    return [
      {
        id: 'working-tree',
        label: root,
        items: [{ file: root.endsWith('first-workspace') ? 'first.txt' : 'second.txt', icon: '', type: 8 }],
      },
    ]
  },
  'ExtensionApi.executeSourceControlIsActive'(_id, scheme) {
    return scheme === 'memfs'
  },
  'ExtensionApi.getSourceControlProviderRegistrySnapshot'() {
    return {
      providers: [
        {
          id: 'sample-source-control-workspace',
        },
      ],
    }
  },
  'ExtensionApi.getStatusBarItems'() {
    return []
  },
  'ExtensionApi.getViewActions'() {
    return []
  },
  'ExtensionApi.getViewMenuEntries'() {
    return []
  },
  'ExtensionApi.getViewRegistrySnapshot'() {
    return {
      views: [],
    }
  },
}

await WebWorkerRpcClient.create({ commandMap })
