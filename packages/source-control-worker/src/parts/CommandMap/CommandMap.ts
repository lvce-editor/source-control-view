import * as Create2 from '../Create2/Create2.ts'
import * as Diff2 from '../Diff2/Diff2.ts'
import * as GetCommandIds from '../GetCommandIds/GetCommandIds.ts'
import * as HandleButtonClick from '../HandleButtonClick/HandleButtonClick.ts'
import * as HandleContextMenu from '../HandleContextMenu/HandleContextMenu.ts'
import * as Initialize from '../Initialize/Initialize.ts'
import * as LoadContent from '../LoadContent/LoadContent.ts'
import * as SaveState from '../SaveState/SaveState.ts'
import * as WrapCommand from '../SourceControlStates/SourceControlStates.ts'
import * as Terminate from '../Terminate/Terminate.ts'

export const commandMap = {
  'Initialize.initialize': Initialize.initialize,
  'SourceControl.handleContextMenu': WrapCommand.wrapCommand(HandleContextMenu.handleContextMenu),
  'SourceControl.diff2': Diff2.diff2,
  'SourceControl.handleButtonClick': WrapCommand.wrapCommand(HandleButtonClick.handleButtonClick),
  'SourceControl.loadControl': LoadContent.loadContent,
  'SourceControl.terminate': Terminate.terminate,
  'SourceControl.getCommandIds': GetCommandIds.getCommandIds,
  'SourceControl.saveState': SaveState.saveState,
  'SourceControl.create2': Create2.create2,
}
