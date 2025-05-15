import { z } from 'zod';

import { ToolContext, ToolType } from '../types';

const parameters = z.object({
  path: z.string().min(1),
  value: z.any()
});

export const setValue: ToolType<typeof parameters> = {
  name: 'set-value',
  description: 'Set a value to a specific path in the AI Network database',
  parameters,
  handler: async (params: z.infer<typeof parameters>, context: ToolContext) => {
    const { ain } = context;
    try {
      const result = await ain.db.ref(params.path).setValue({
        value: params.value
      });
      if (result.result.code !== 0) {
        return {
          content: [{ type: 'text', text: result.result.message }],
          isError: true
        }
      }
      return {
        content: [{ type: 'text', text: JSON.stringify(result)}]
      }
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message);
    }
  }
}