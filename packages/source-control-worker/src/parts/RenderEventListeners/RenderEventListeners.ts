import type { DomEventListener } from '../DomEventListener/DomEventListener.ts'
import * as DomEventListenersFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'

export const renderEventListeners = (): readonly DomEventListener[] => {
  return [
    {
      name: DomEventListenersFunctions.HandleWheel,
      params: ['handleWheel', 'event.deltaMode', 'event.deltaY'],
      passive: true,
    },
    {
      name: DomEventListenersFunctions.HandleFocus,
      params: ['handleFocus'],
    },
    {
      name: DomEventListenersFunctions.HandleClickAt,
      params: ['handleClickAt', 'event.clientX', 'event.clientY'],
    },
    {
      name: DomEventListenersFunctions.HandleMouseOverAt,
      params: ['handleMouseOverAt', 'event.clientX', 'event.clientY'],
    },
    {
      name: DomEventListenersFunctions.HandleMouseOver,
      params: ['handleMouseOver', 'event.clientX', 'event.clientY'],
    },
    {
      name: DomEventListenersFunctions.HandleMouseOver,
      params: ['handleMouseOut'],
    },
    {
      name: DomEventListenersFunctions.HandleInput,
      params: ['handleInput', 'event.target.value'],
    },
    {
      name: DomEventListenersFunctions.HandleContextMenu,
      params: ['handleContextMenu', 'event.button', 'event.clientX', 'event.clientY'],
      preventDefault: true,
    },
    {
      name: DomEventListenersFunctions.HandleWheel,
      params: ['handleWheel', 'event.deltaMode', 'event.deltaY'],
      passive: true,
    },
  ]
}
