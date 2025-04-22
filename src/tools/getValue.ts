import { z } from 'zod';
import AIN from "@ainblockchain/ain-js";

import { MCP_SERVER_CONFIG } from "../config";
import { ToolContext, ToolType } from '../types';

const args = z.object({
  path: z.string().min(1)
});

export const getValue: ToolType<typeof args> = {
  name: 'get-value',
  description: 'Get the value of a path from the database',
  args: args,
  handler: async (args, context: ToolContext) => {
    const ain = new AIN(
      MCP_SERVER_CONFIG.providerUrl,
      MCP_SERVER_CONFIG.eventHandlerUrl,
      Number(MCP_SERVER_CONFIG.chainId)
    );
    const value = await ain.db.ref(args.path).getValue();
    return value;
  }
}