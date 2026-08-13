import { PlainMessagePortRpc } from '@lvce-editor/rpc'
import * as RendererProcess from '../RendererProcess/RendererProcess.ts'

export const handleRendererProcessMessagePort = async (port: any): Promise<void> => {
  const rpc = await PlainMessagePortRpc.create({
    commandMap: {},
    messagePort: port,
  })
  RendererProcess.set(rpc)
}
