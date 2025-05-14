import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import { MCP_SERVER_CONFIG } from "./config";
import { Tools } from "./tools";
import { ToolContext, ToolType } from "./types";
import AIN from "@ainblockchain/ain-js";

class AINMCP extends McpServer {
  private ain: AIN;

  constructor() {
    super({
      name: MCP_SERVER_CONFIG.name,
      version: MCP_SERVER_CONFIG.version,
    });
    this.ain = new AIN(
      MCP_SERVER_CONFIG.providerUrl,
      MCP_SERVER_CONFIG.eventHandlerUrl,
      Number(MCP_SERVER_CONFIG.chainId)
    );

    if (MCP_SERVER_CONFIG.privateKey !== "") {
      this.ain.wallet.addAndSetDefaultAccount(MCP_SERVER_CONFIG.privateKey);
    }
  }

  private getToolContext(): ToolContext {
    return {
      ain: this.ain,
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
