import { z } from 'zod';

import { ToolContext, ToolType } from '../types';

const parameters = z.object({
  path: z.string().min(1)
});

export const getValue: ToolType<typeof parameters> = {
  name: 'get-value',
  description: 'Get the value of a path from the database on AI Network',
  parameters,
  handler: async (params: z.infer<typeof parameters>, context: ToolContext) => {
    const { ain } = context;
    try {
      const result = await ain.db.ref(params.path).getValue();
      return {
        content: [{ type: 'text', text: JSON.stringify(result)}]
      }
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message);
    }
  }
}