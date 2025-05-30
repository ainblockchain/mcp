import dotenv from "dotenv";

dotenv.config();

export const MCP_SERVER_CONFIG = {
  name: 'AI-Network-MCP-Server',
  version: '1.0.0',
  port: process.env.PORT || 3000,
  environment: process.env.NODE_ENV || 'development',
  providerUrl: process.env.PROVIDER_URL || 'https://testnet-api.ainetwork.ai',
  eventHandlerUrl: process.env.EVENT_HANDLER_URL || 'wss://testnet-api.ainetwork.ai',
  chainId: process.env.CHAIN_ID || '0',
  privateKey: process.env.AIN_PRIVATE_KEY || '',
  dagRPC: process.env.DAG_RPC || '',
} as const;

export type ServerConfig = typeof MCP_SERVER_CONFIG;