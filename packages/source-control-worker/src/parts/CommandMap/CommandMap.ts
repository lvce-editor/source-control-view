import * as Initialize from '../Initialize/Initialize.ts'
import * as LoadContent from '../LoadContent/LoadContent.ts'
import * as Terminate from '../Terminate/Terminate.ts'

export const commandMap = {
  'Initialize.initialize': Initialize.initialize,
  'SourceControl.loadControl': LoadContent.loadContent,
  'SourceControl.terminate': Terminate.terminate,
}
