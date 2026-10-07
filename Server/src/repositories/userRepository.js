// EXTRACTION LAYER: CRUD operations on the `login_cred` table.

import { db as defaultDb } from '../db/connection.js';
import { FIND_USER_BY_USERNAME, INSERT_USER, UPDATE_PASSWORD_WITH_ANSWER } from './queries.js';

export const createUserRepository = (db = defaultDb) => ({
  async findByUsername(username) {
    const [rows] = await db.execute(FIND_USER_BY_USERNAME, [username]);
    return rows[0] ?? null;
  },

  async create({ username, passwordHash, role, email, securityAns1, securityAns2 }) {
    await db.execute(INSERT_USER, [username, passwordHash, role, email, securityAns1, securityAns2]);
  },

  // Returns true when a row matched the username + security answer.
  async updatePasswordWithAnswer(username, securityAns1, passwordHash) {
    const [result] = await db.execute(UPDATE_PASSWORD_WITH_ANSWER, [passwordHash, username, securityAns1]);
    return result.affectedRows > 0;
  },
});

export default createUserRepository;
