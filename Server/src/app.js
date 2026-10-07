// Composition root: wires repositories -> services -> routes into an Express app.
// Dependencies can be overridden, which is how the tests run without MySQL.

import express from 'express';
import cors from 'cors';
import config from './config/index.js';
import { db, pingDatabase } from './db/connection.js';
import { createUserRepository } from './repositories/userRepository.js';
import { createPatientRepository } from './repositories/patientRepository.js';
import { createAuthService } from './services/authService.js';
import { createPatientService } from './services/patientService.js';
import { createApiRouter } from './routes/index.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandlers.js';

export const createApp = ({
  authService = createAuthService(createUserRepository(db)),
  patientService = createPatientService(createPatientRepository(db)),
  healthCheck = pingDatabase,
} = {}) => {
  const app = express();

  app.disable('x-powered-by');
  app.use(cors({ origin: config.corsOrigin }));
  app.use(express.json({ limit: '100kb' }));
  app.use(express.urlencoded({ extended: false }));

  app.use('/api', createApiRouter({ authService, patientService, healthCheck }));

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
};

export default createApp;
