import config from './config/config.js';
import app from './app.js';
import logger from './utils/logger.js';

const { SERVER_PORT } = config.env;
async function main() {
  app.listen(SERVER_PORT);
  logger.info(`Starting server on port ${SERVER_PORT}`);
}

main();
