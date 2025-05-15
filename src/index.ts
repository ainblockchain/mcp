import "./log";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import AINMCP from "./AINMCP";

async function main() {
  const server = new AINMCP();
  const transport = new StdioServerTransport();
  server.registerTools();

  await server.connect(transport);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});