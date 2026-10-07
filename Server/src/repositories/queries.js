// EXTRACTION LAYER: every SQL statement used by the API lives here.

export const FIND_USER_BY_USERNAME =
  'SELECT username, password, role, email_id, security_ans1 FROM login_cred WHERE username = ?';

export const INSERT_USER =
  'INSERT INTO login_cred (username, password, role, email_id, security_ans1, security_ans2) VALUES (?, ?, ?, ?, ?, ?)';

export const UPDATE_PASSWORD_WITH_ANSWER =
  'UPDATE login_cred SET password = ? WHERE username = ? AND security_ans1 = ?';

// The column is spelled `pattient_id` in the schema; alias it so the rest
// of the system can use the correct spelling.
export const FIND_PATIENT_BY_ID = `
  SELECT pattient_id AS patient_id, department, contact, health_concerns,
         primary_physician, admission_status
  FROM patients
  WHERE pattient_id = ?`;
