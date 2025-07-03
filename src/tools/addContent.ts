import { z } from 'zod';
import { ToolContext, ToolType } from '../types';

const parameters = z.object({
  cid: z.string().optional(),
  message: z.string().optional(),
  data: z.string().optional(), // string(base64)
  children: z.array(z.string()).optional(),
});

export const addContent: ToolType<typeof parameters> = {
  name: 'add-content',
  description: `Add content to the AI Network DAG via gRPC.
- You can provide a simple string in 'message' to store as content,
- When you want to upload a file, you should use 'data' as the file content (string(base64)) and 'message' as a file name.
- The resulting 'cid' (content identifier) will be generated and returned in the result.`,
  parameters,
  handler: async (params: z.infer<typeof parameters>, context: ToolContext) => {
    const { dagClient } = context;
    try {
        if (!dagClient) {
          throw new Error("DAG RPC URL not set");
        }
        const addParams: any = { ...params };
        if (params.data && typeof params.data === 'string') {
            addParams.data = Buffer.from(params.data, 'base64'); // bytes
        } else {
            delete addParams.data; // Prevent sending undefined data
        }
      const result = await dagClient.add(addParams);
      return {
        content: [{ type: 'text', text: `Add succeeded: ${result.cid}` }],
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