// EXTRACTION LAYER: read operations on the `patients` table.

import { db as defaultDb } from '../db/connection.js';
import { FIND_PATIENT_BY_ID } from './queries.js';

export const createPatientRepository = (db = defaultDb) => ({
  async findById(patientId) {
    const [rows] = await db.execute(FIND_PATIENT_BY_ID, [patientId]);
    return rows[0] ?? null;
  },
});

export default createPatientRepository;
