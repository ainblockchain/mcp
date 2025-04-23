import { z } from 'zod';

import { MCP_SERVER_CONFIG } from "../config";
import { ToolContext, ToolType } from '../types';

const parameters = z.object({
  path: z.string().min(1)
});

export const getValue: ToolType<typeof parameters> = {
  name: 'get-value',
  description: 'Get the value of a path from the database on AI Network',
  parameters,
  handler: async (params: z.infer<typeof parameters>, context: ToolContext) => {
    try {
      const res = await fetch(`${MCP_SERVER_CONFIG.providerUrl}/json-rpc`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "jsonrpc": "2.0",
          "id": 1,
          "method": "ain_get",
          "params": {
            "protoVer": "1.5.1",
            "type": "GET_VALUE",
            "ref": params.path
          }
        })
      });
      const data = await res.json();
      return {
        content: [{ type: 'text', text: JSON.stringify(data.result.result) }],
      };
    } catch (error) {
      console.error(error);
    }
  }
}