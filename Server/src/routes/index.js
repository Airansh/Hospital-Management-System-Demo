// MAPPING LAYER: mounts every feature router under /api.

import { Router } from 'express';
import { createAuthRouter } from './authRoutes.js';
import { createPatientRouter } from './patientRoutes.js';

export const createApiRouter = ({ authService, patientService, healthCheck }) => {
  const router = Router();

  router.get('/health', async (req, res) => {
    try {
      await healthCheck();
      res.json({ status: 'ok', database: 'up' });
    } catch (error) {
      res.status(503).json({ status: 'degraded', database: 'down', message: 'Database unreachable' });
    }
  });

  router.use(createAuthRouter(authService));
  router.use(createPatientRouter(patientService));

  return router;
};

export default createApiRouter;
