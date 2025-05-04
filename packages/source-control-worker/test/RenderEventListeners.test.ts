import { test, expect } from '@jest/globals'
import { renderEventListeners } from '../src/parts/RenderEventListeners/RenderEventListeners.ts'
import * as DomEventListenersFunctions from '../src/parts/DomEventListenerFunctions/DomEventListenerFunctions.ts'

test('renderEventListeners returns correct event listeners', () => {
  const listeners = renderEventListeners()

  expect(listeners).toHaveLength(9)

  expect(listeners[0]).toEqual({
    name: DomEventListenersFunctions.HandleWheel,
    params: ['handleWheel', 'event.deltaMode', 'event.deltaY'],
    passive: true,
  })

  expect(listeners[1]).toEqual({
    name: DomEventListenersFunctions.HandleFocus,
    params: ['handleFocus'],
  })

  expect(listeners[2]).toEqual({
    name: DomEventListenersFunctions.HandleClickAt,
    params: ['handleClickAt', 'event.clientX', 'event.clientY', 'event.target.name'],
  })

  expect(listeners[3]).toEqual({
    name: DomEventListenersFunctions.HandleMouseOverAt,
    params: ['handleMouseOverAt', 'event.clientX', 'event.clientY'],
  })

  expect(listeners[4]).toEqual({
    name: DomEventListenersFunctions.HandleMouseOver,
    params: ['handleMouseOver', 'event.clientX', 'event.clientY'],
  })

  expect(listeners[5]).toEqual({
    name: DomEventListenersFunctions.HandleMouseOutAt,
    params: ['handleMouseOutAt', 'event.clientX', 'event.clientY'],
  })

  expect(listeners[6]).toEqual({
    name: DomEventListenersFunctions.HandleInput,
    params: ['handleInput', 'event.target.value'],
  })

  expect(listeners[7]).toEqual({
    name: DomEventListenersFunctions.HandleContextMenu,
    params: ['handleContextMenu', 'event.button', 'event.clientX', 'event.clientY'],
    preventDefault: true,
  })

  expect(listeners[8]).toEqual({
    name: DomEventListenersFunctions.HandleWheel,
    params: ['handleWheel', 'event.deltaMode', 'event.deltaY'],
    passive: true,
  })
})
