import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'
import * as SourceControlStrings from '../SourceControlStrings/SourceControlStrings.ts'
import * as TabIndex from '../TabIndex/TabIndex.ts'
import * as VirtualDomHelpers from '../VirtualDomHelpers/VirtualDomHelpers.ts'

const className = MergeClassNames.mergeClassNames(ClassNames.Viewlet, ClassNames.SourceControl)

const getButtonClassName = (isWide: boolean): string => {
  return MergeClassNames.mergeClassNames(ClassNames.Button, ClassNames.ButtonPrimary, isWide ? ClassNames.ButtonWide : ClassNames.ButtonNarrow)
}

const rootNode: VirtualDomNode = {
  childCount: 1,
  className,
  tabIndex: TabIndex.Focusable,
  type: VirtualDomElements.Div,
}

const welcomeNode: VirtualDomNode = {
  childCount: 2,
  className: ClassNames.Welcome,
  type: VirtualDomElements.Div,
}

const messageNode: VirtualDomNode = {
  childCount: 1,
  className: ClassNames.WelcomeMessage,
  type: VirtualDomElements.P,
}

export const getSourceControlWelcomeVirtualDom = (isWide: boolean): readonly VirtualDomNode[] => {
  return [
    rootNode,
    welcomeNode,
    messageNode,
    VirtualDomHelpers.text(SourceControlStrings.youHaveNotYetOpenedAFolder()),
    {
      childCount: 1,
      className: getButtonClassName(isWide),
      name: 'OpenFolder',
      onClick: DomEventListenerFunctions.HandleClickOpenFolder,
      type: VirtualDomElements.Button,
    },
    VirtualDomHelpers.text(SourceControlStrings.openFolder()),
  ]
}
