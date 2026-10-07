// BUSINESS RULES LAYER: patient record rules.

import { notFound } from '../utils/HttpError.js';

export const createPatientService = (patients) => ({
  async getPatient(patientId) {
    const patient = await patients.findById(String(patientId).trim());
    if (!patient) {
      throw notFound('Patient not found');
    }
    return patient;
  },
});

export default createPatientService;
