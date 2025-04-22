import { z } from "zod";
import AIN from "@ainblockchain/ain-js";

export interface ToolContext {
  // ain: AIN;
}

export interface ToolType<Args extends z.ZodType> {
  name: string;
  description: string;
  args: Args;
  handler: (args: z.infer<Args>, context: ToolContext) => Promise<any>;
}