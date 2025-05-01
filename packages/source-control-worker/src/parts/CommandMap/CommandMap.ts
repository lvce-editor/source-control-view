import * as Initialize from '../Initialize/Initialize.ts'
import * as Terminate from '../Terminate/Terminate.ts'

export const commandMap = {
  'SourceControl.terminate': Terminate.terminate,
  'Initialize.initialize': Initialize.initialize,
}
