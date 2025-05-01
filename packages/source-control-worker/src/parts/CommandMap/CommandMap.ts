import * as Create2 from '../Create2/Create2.ts'
import * as Diff2 from '../Diff2/Diff2.ts'
import * as GetCommandIds from '../GetCommandIds/GetCommandIds.ts'
import * as HandleButtonClick from '../HandleButtonClick/HandleButtonClick.ts'
import * as HandleContextMenu from '../HandleContextMenu/HandleContextMenu.ts'
import * as Initialize from '../Initialize/Initialize.ts'
import * as LoadContent from '../LoadContent/LoadContent.ts'
import * as Render2 from '../Render2/Render2.ts'
import * as RenderActions2 from '../RenderActions2/RenderActions2.ts'
import * as RenderEventListeners from '../RenderEventListeners/RenderEventListeners.ts'
import * as SaveState from '../SaveState/SaveState.ts'
import * as WrapCommand from '../SourceControlStates/SourceControlStates.ts'
import * as Terminate from '../Terminate/Terminate.ts'

export const commandMap = {
  'Initialize.initialize': Initialize.initialize,
  'SourceControl.create2': Create2.create2,
  'SourceControl.diff2': Diff2.diff2,
  'SourceControl.getCommandIds': GetCommandIds.getCommandIds,
  'SourceControl.handleButtonClick': WrapCommand.wrapCommand(HandleButtonClick.handleButtonClick),
  'SourceControl.handleContextMenu': WrapCommand.wrapCommand(HandleContextMenu.handleContextMenu),
  'SourceControl.loadContent': LoadContent.loadContent,
  'SourceControl.render2': Render2.render2,
  'SourceControl.renderActions2': RenderActions2.renderActions,
  'SourceControl.renderEventListeners': RenderEventListeners.renderEventListeners,
  'SourceControl.saveState': SaveState.saveState,
  'SourceControl.terminate': Terminate.terminate,
}
