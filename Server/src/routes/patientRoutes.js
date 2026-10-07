// MAPPING LAYER: patient endpoints (consumed by the PatientDetails facade).

import { Router } from 'express';
import { asyncHandler } from '../middleware/asyncHandler.js';
import { requireFields } from '../middleware/requireFields.js';

export const createPatientRouter = (patientService) => {
  const router = Router();

  router.get('/patients/:patientId', asyncHandler(async (req, res) => {
    res.json(await patientService.getPatient(req.params.patientId));
  }));

  // Kept for backwards compatibility with existing clients.
  router.post('/patient', requireFields('patientId'), asyncHandler(async (req, res) => {
    res.json(await patientService.getPatient(req.body.patientId));
  }));

  return router;
};

export default createPatientRouter;
