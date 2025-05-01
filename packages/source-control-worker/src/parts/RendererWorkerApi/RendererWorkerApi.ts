export interface RendererWorkerApi {
  readonly 'ClipBoard.writeText': (text: string) => Promise<void>
  readonly 'ColorTheme.getColorThemeNames': () => Promise<readonly string[]>
  readonly 'ColorTheme.setColorTheme': (id: string) => Promise<void>
  readonly 'ContextMenu.show': (x: number, y: number, id: any, ...args: readonly any[]) => Promise<void>
  readonly 'ErrorHandling.showErrorDialog': (errorInfo: any) => Promise<void>
  readonly 'ExtensionHost.executeCommand': (id: string) => Promise<void>
  readonly 'ExtensionHost.getCommands': () => Promise<readonly any[]>
  readonly 'ExtensionHost.searchFileWithFetch': (uri: string) => Promise<readonly string[]>
  readonly 'ExtensionHost.searchFileWithHtml': (uri: string) => Promise<readonly string[]>
  readonly 'ExtensionHost.searchFileWithMemory': (uri: string) => Promise<readonly string[]>
  readonly 'ExtensionHostManagement.activateByEvent': (event: string) => Promise<void>
  readonly 'Focus.setFocus': (focusKey: number) => Promise<void>
  readonly 'IconTheme.getFileIcon': (options: any) => Promise<string>
  readonly 'IconTheme.getFolderIcon': (options: any) => Promise<string>
  readonly 'Main.openUri': (uri: string, focus?: boolean, props?: any) => Promise<void>
  readonly 'RecentlyOpened.getRecentlyOpened': () => Promise<readonly string[]>
  readonly 'Run And Debug.handlePaused': (params: any) => Promise<void>
  readonly 'Run And Debug.handleResumed': (params: any) => Promise<void>
  readonly 'Run And Debug.handleScriptParsed': (params: any) => Promise<void>
  readonly 'SearchProcess.invoke': (command: string, ...args: readonly any[]) => Promise<any>
  readonly 'SendMessagePortToExtensionHostWorker.sendMessagePortToExtensionHostWorker': (port: MessagePort, initialCommand: string, rpcId: number) => Promise<void>
  readonly 'Viewlet.closeWidget': (id: number) => Promise<void>
  readonly 'Viewlet.openWidget': (id: string) => Promise<void>
  readonly 'Workspace.getPath': () => Promise<string>
  readonly 'Workspace.setPath': (uri: string) => Promise<void>
}
