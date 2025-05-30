import { z } from "zod";
import AIN from "@ainblockchain/ain-js";
import { AINetworkDAGClient } from "ai-network-dag-client"

export interface ToolContext {
  ain: AIN;
  dagClient: AINetworkDAGClient
}

export interface ToolType<P extends z.ZodType> {
  name: string;
  description: string;
  parameters: P;
  handler: (args: z.infer<P>, context: ToolContext) => Promise<any>;
}