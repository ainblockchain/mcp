import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import { MCP_SERVER_CONFIG } from "./config";
import { Tools } from "./tools";
import { ToolContext, ToolType } from "./types";

class AINMCP extends McpServer {
  constructor() {
    super({
      name: MCP_SERVER_CONFIG.name,
      version: MCP_SERVER_CONFIG.version,
    });
  }

  private getToolContext(): ToolContext {
    return {
      // ain: this.ain,
    }
  }

  public registerTools() {
    Tools.forEach((tool: ToolType<any>) => {
      this.tool(
        tool.name,
        tool.description,
        tool.parameters.shape,
        async (args, extra) => tool.handler(args, this.getToolContext())
      );
    });
  }
}

export default AINMCP;
