import { badRequest } from '../utils/HttpError.js';
import { missingFields } from '../utils/validation.js';

// SECURITY LAYER: reject requests that are missing required body fields.
export const requireFields = (...fields) => (req, res, next) => {
  const missing = missingFields(req.body, fields);
  if (missing.length > 0) {
    return next(badRequest(`Missing required field(s): ${missing.join(', ')}`));
  }
  return next();
};

export default requireFields;
