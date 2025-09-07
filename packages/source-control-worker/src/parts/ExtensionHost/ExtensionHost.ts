import type { MockRpc } from '@lvce-editor/rpc-registry'
import { ExtensionHost } from '@lvce-editor/rpc-registry'

export const { invoke, set, registerMockRpc } = ExtensionHost

export type { MockRpc }
