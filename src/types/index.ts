import { z } from "zod";

export interface ToolContext {
  // ain: AIN;
}

export interface ToolType<P extends z.ZodType> {
  name: string;
  description: string;
  parameters: P;
  handler: (args: z.infer<P>, context: ToolContext) => Promise<any>;
}