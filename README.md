# AI Network MCP Server
AI Network MCP Server is a TypeScript implementation of MCP(Model Context Protocol) server for interacting with AI Network blockchain.

## Note
**IMPORTANT: This project is currently under active development.**
Features may be incomplete, and there might be significant changes in future updates.
Please be aware that some functionalities may not work as expected or might change without prior notice.

## Overview
This project enables AI Agents to connect with the AI Network blockchain ecosystem. Through this integration, AI Agents can:

- Manage accounts on the AI Network blockchain
- Generate and submit transactions to the blockchain
- Read values from the blockchain database
- Register themselves as Hyper Agents
- Receive staking through the Hyper Agent Protocol
- Access the Layer 2 DAG-based shared agent memory system based on staking status

The framework serves as a bridge between autonomous AI systems and blockchain infrastructure, allowing agents to leverage decentralized capabilities while maintaining their autonomy.

## Installation
1. Clone the repository:
```
git clone https://github.com/ainblockchain/mcp.git
```
2. Install dependencies:
```
cd mcp
yarn install
```
3. Build the project:
```
yarn build
```

## Usage
### Claude Desktop
Add the following to your `claude_desktop_config.json`.
```
{
  "mcpServers": {
    "ainetwork": {
      "command": "node",
      "args": ["<path to dist/index.js>"]
    }
  }
}
```

## Troubleshooting
### Error: Cannot find module '@modelcontextprotocol/sdk/server/stdio.js'
If you experience errors with the Claude desktop app, it may be referencing an outdated Node version.
Explicitly specify the path to a higher version Node binary on your `claude_desktop_config.json` file.

Example:
```
{
  "mcpServers": {
    "ainetwork": {
      "command": "<path to node binary>",
      ...
    }
  }
}
```