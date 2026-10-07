// BUSINESS RULES LAYER: authentication and account rules.

import bcrypt from 'bcryptjs';
import config from '../config/index.js';
import { badRequest, conflict, unauthorized } from '../utils/HttpError.js';

export const ROLES = Object.freeze(['patient', 'provider', 'admin']);
// Self-service sign-up can only ever create patient accounts;
// providers and admins are provisioned directly in the database.
export const SIGNUP_ROLE = 'patient';

const INVALID_CREDENTIALS = 'Invalid username or password';

// Never send the password hash or security answers to the client.
const toPublicUser = ({ username, role, email_id: email }) => ({ username, role, email });

export const createAuthService = (users, { hasher = bcrypt, saltRounds = config.bcryptSaltRounds } = {}) => ({
  async login(username, password) {
    const user = await users.findByUsername(username);
    // Seeded demo rows may hold non-bcrypt values; treat a compare failure as a mismatch.
    const matches = user ? await hasher.compare(password, user.password).catch(() => false) : false;
    if (!matches) {
      throw unauthorized(INVALID_CREDENTIALS);
    }
    return toPublicUser(user);
  },

  async signup({ email, password, securityAns1, securityAns2 = '' }) {
    if (await users.findByUsername(email)) {
      throw conflict('An account with this email already exists');
    }
    const passwordHash = await hasher.hash(password, saltRounds);
    try {
      await users.create({
        username: email,
        passwordHash,
        role: SIGNUP_ROLE,
        email,
        securityAns1,
        securityAns2,
      });
    } catch (error) {
      if (error?.code === 'ER_DUP_ENTRY') {
        throw conflict('An account with this email already exists');
      }
      throw error;
    }
    return { username: email, role: SIGNUP_ROLE, email };
  },

  async resetPassword(username, securityAns1, newPassword) {
    if (String(newPassword).length < 1) {
      throw badRequest('New password must not be empty');
    }
    const passwordHash = await hasher.hash(newPassword, saltRounds);
    const updated = await users.updatePasswordWithAnswer(username, securityAns1, passwordHash);
    if (!updated) {
      throw unauthorized('Wrong Email id or Security Answer!');
    }
  },
});

export default createAuthService;
