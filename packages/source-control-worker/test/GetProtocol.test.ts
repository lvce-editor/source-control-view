import { test, expect } from '@jest/globals'
import * as FileSystemProtocol from '../src/parts/FileSystemProtocol/FileSystemProtocol.ts'
import * as GetProtocol from '../src/parts/GetProtocol/GetProtocol.ts'

test('getProtocol - empty uri', () => {
  expect(GetProtocol.getProtocol('')).toBe(FileSystemProtocol.Disk)
})

test('getProtocol - file protocol', () => {
  expect(GetProtocol.getProtocol('file:///path/to/file')).toBe('file')
})

test('getProtocol - http protocol', () => {
  const uri = ['http:', '//example.com'].join('')
  expect(GetProtocol.getProtocol(uri)).toBe('http')
})

test('getProtocol - https protocol', () => {
  expect(GetProtocol.getProtocol('https://example.com')).toBe('https')
})

test('getProtocol - no protocol', () => {
  expect(GetProtocol.getProtocol('/path/to/file')).toBe(FileSystemProtocol.Disk)
})

test('getPath - empty uri', () => {
  expect(GetProtocol.getPath('file', '')).toBe('')
})

test('getPath - file protocol', () => {
  expect(GetProtocol.getPath('file', 'file:///path/to/file')).toBe('/path/to/file')
})

test('getPath - http protocol', () => {
  const uri = ['http:', '//example.com'].join('')
  expect(GetProtocol.getPath('http', uri)).toBe('example.com')
})

test('getPath - disk protocol without file:// prefix', () => {
  expect(GetProtocol.getPath(FileSystemProtocol.Disk, '/path/to/file')).toBe('/path/to/file')
})

test('getPath - empty protocol', () => {
  const uri = ['http:', '//example.com'].join('')
  expect(GetProtocol.getPath('', uri)).toBe(uri)
})
