import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createAuthService, SIGNUP_ROLE } from '../src/services/authService.js';

// Deterministic stand-in for bcrypt so tests are fast.
const fakeHasher = {
  hash: async (value) => `hashed:${value}`,
  compare: async (value, hash) => hash === `hashed:${value}`,
};

const makeUsers = (initial = []) => {
  const rows = new Map(initial.map((u) => [u.username, u]));
  return {
    rows,
    findByUsername: async (username) => rows.get(username) ?? null,
    create: async (u) => rows.set(u.username, { username: u.username, password: u.passwordHash, role: u.role, email_id: u.email, security_ans1: u.securityAns1 }),
    updatePasswordWithAnswer: async (username, ans, hash) => {
      const row = rows.get(username);
      if (!row || row.security_ans1 !== ans) return false;
      row.password = hash;
      return true;
    },
  };
};

const alice = { username: 'a@x.com', password: 'hashed:secret', role: 'provider', email_id: 'a@x.com', security_ans1: '1990' };

test('login returns a public user without secrets', async () => {
  const service = createAuthService(makeUsers([alice]), { hasher: fakeHasher });
  const user = await service.login('a@x.com', 'secret');
  assert.deepEqual(user, { username: 'a@x.com', role: 'provider', email: 'a@x.com' });
});

test('login rejects wrong password and unknown user with the same 401', async () => {
  const service = createAuthService(makeUsers([alice]), { hasher: fakeHasher });
  await assert.rejects(service.login('a@x.com', 'nope'), { status: 401, message: 'Invalid username or password' });
  await assert.rejects(service.login('ghost@x.com', 'secret'), { status: 401, message: 'Invalid username or password' });
});

test('login treats a hasher error (non-bcrypt seed data) as a mismatch', async () => {
  const hasher = { ...fakeHasher, compare: async () => { throw new Error('Invalid salt'); } };
  const service = createAuthService(makeUsers([alice]), { hasher });
  await assert.rejects(service.login('a@x.com', 'secret'), { status: 401 });
});

test('signup always creates a patient and hashes the password', async () => {
  const users = makeUsers();
  const service = createAuthService(users, { hasher: fakeHasher });
  const user = await service.signup({ email: 'b@x.com', password: 'pw', securityAns1: '2000' });
  assert.equal(user.role, SIGNUP_ROLE);
  assert.equal(users.rows.get('b@x.com').password, 'hashed:pw');
  assert.equal(users.rows.get('b@x.com').role, 'patient');
});

test('signup rejects duplicate accounts with 409', async () => {
  const service = createAuthService(makeUsers([alice]), { hasher: fakeHasher });
  await assert.rejects(service.signup({ email: 'a@x.com', password: 'pw', securityAns1: '1' }), { status: 409 });
});

test('signup maps a racing ER_DUP_ENTRY to 409', async () => {
  const users = makeUsers();
  users.create = async () => { throw Object.assign(new Error('dup'), { code: 'ER_DUP_ENTRY' }); };
  const service = createAuthService(users, { hasher: fakeHasher });
  await assert.rejects(service.signup({ email: 'c@x.com', password: 'pw', securityAns1: '1' }), { status: 409 });
});

test('resetPassword updates the hash when the answer matches', async () => {
  const users = makeUsers([{ ...alice }]);
  const service = createAuthService(users, { hasher: fakeHasher });
  await service.resetPassword('a@x.com', '1990', 'new');
  assert.equal(users.rows.get('a@x.com').password, 'hashed:new');
});

test('resetPassword rejects a wrong answer with 401', async () => {
  const service = createAuthService(makeUsers([{ ...alice }]), { hasher: fakeHasher });
  await assert.rejects(service.resetPassword('a@x.com', 'wrong', 'new'), { status: 401 });
});
