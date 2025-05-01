import { test, expect } from '@jest/globals'
import { getPortTuple } from '../src/parts/GetPortTuple/GetPortTuple.js'

test('getPortTuple returns a MessageChannel with two ports', () => {
  const result = getPortTuple()
  expect(result).toHaveProperty('port1')
  expect(result).toHaveProperty('port2')
  expect(result.port1).toBeInstanceOf(MessagePort)
  expect(result.port2).toBeInstanceOf(MessagePort)
})
