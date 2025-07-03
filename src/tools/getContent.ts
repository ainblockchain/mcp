import { z } from 'zod';
import { ToolContext, ToolType } from '../types';

const parameters = z.object({
  cid: z.string().min(1)
});

export const getContent: ToolType<typeof parameters> = {
  name: 'get-content',
  description: 'Get content from the AI Network DAG by CID.',
  parameters,
  handler: async (params: z.infer<typeof parameters>, context: ToolContext) => {
    const { dagClient } = context;
    try {
      if (!dagClient) {
        throw new Error("DAG RPC URL not set");
      }

      const result = await dagClient.get(params.cid);
      return {
        content: [{ type: 'text', text: JSON.stringify(result) }],
        isError: false
      };
    } catch (error: any) {
      return {
        content: [{ type: 'text', text: error.message }],
        isError: true
      };
    }
  }
};