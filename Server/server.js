// Entry point: starts the API (data) server.

import config from './src/config/index.js';
import { createApp } from './src/app.js';
import { db, pingDatabase } from './src/db/connection.js';

const app = createApp();

const server = app.listen(config.port, () => {
  console.log(`API server running on http://localhost:${config.port}/api`);
});

pingDatabase()
  .then(() => console.log(`Connected to MySQL database "${config.db.database}"`))
  .catch((error) => console.error(`Cannot connect to database (${error.code || error.message}); requests will fail until it is reachable`));

const shutdown = () => {
  server.close(() => db.end().finally(() => process.exit(0)));
};
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
