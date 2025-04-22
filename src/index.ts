import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import AINMCP from "./AINMCP";

async function main() {
  const server = new AINMCP();
  const transport = new StdioServerTransport();

  await server.connect(transport);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});