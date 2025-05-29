import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import { MCP_SERVER_CONFIG } from "./config";
import { Tools } from "./tools";
import { ToolContext, ToolType } from "./types";
import AIN from "@ainblockchain/ain-js";
const AINetworkDAGClient = require('ai-network-dag-client');

class AINMCP extends McpServer {
  private ain: AIN;
  private dagClient: any;

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
    // Create a new client instance
    this.dagClient = new AINetworkDAGClient(MCP_SERVER_CONFIG.dagRPC);

    if (MCP_SERVER_CONFIG.privateKey !== "") {
      this.ain.wallet.addAndSetDefaultAccount(MCP_SERVER_CONFIG.privateKey);
    }
  }

  private getToolContext(): ToolContext {
    return {
      ain: this.ain,
      dagClient: this.dagClient,
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
