import { isESModule } from '@intlayer/config';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { readFileSync } from 'fs';
import { dirname as pathDirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { loadCLITools } from '../tools/cli';
import { loadDocsTools } from '../tools/docs';

export const dirname = isESModule
  ? pathDirname(fileURLToPath(import.meta.url))
  : __dirname;

const packageJson = JSON.parse(
  readFileSync(resolve(dirname, '../../../package.json'), 'utf8')
);

export const loadServer = (isLocal: boolean): McpServer => {
  const server = new McpServer({
    name: 'intlayer',
    version: packageJson.version,
    capabilities: {
      resources: {},
    },
  });

  if (!isLocal) {
    loadCLITools(server);
  }

  loadDocsTools(server);

  return server;
};
