import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { createApp } from '../src/app.js';
import { db } from '../src/db/connection.js';
import { unauthorized, notFound } from '../src/utils/HttpError.js';

let server;
let baseUrl;
let healthy = true;

const authService = {
  login: async (username, password) => {
    if (password !== 'good') throw unauthorized('Invalid username or password');
    return { username, role: 'patient', email: username };
  },
  signup: async ({ email }) => ({ username: email, role: 'patient', email }),
  resetPassword: async () => {},
};

const patientService = {
  getPatient: async (id) => {
    if (id !== 'ved') throw notFound('Patient not found');
    return { patient_id: 'ved', department: 'family health' };
  },
};

before(async () => {
  const app = createApp({
    authService,
    patientService,
    healthCheck: async () => { if (!healthy) throw new Error('down'); },
  });
  await new Promise((resolve) => { server = app.listen(0, resolve); });
  baseUrl = `http://127.0.0.1:${server.address().port}/api`;
});

after(async () => {
  await new Promise((resolve) => server.close(resolve));
  await db.end();
});

const post = (path, body, raw) => fetch(`${baseUrl}${path}`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: raw ?? JSON.stringify(body),
});

test('POST /login succeeds with valid credentials', async () => {
  const res = await post('/login', { username: 'u@x.com', password: 'good' });
  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), { message: 'Login successful', user: { username: 'u@x.com', role: 'patient', email: 'u@x.com' } });
});

test('POST /login returns 401 for bad credentials', async () => {
  const res = await post('/login', { username: 'u@x.com', password: 'bad' });
  assert.equal(res.status, 401);
  assert.equal((await res.json()).message, 'Invalid username or password');
});

test('POST /login returns 400 when fields are missing', async () => {
  const res = await post('/login', { username: 'u@x.com' });
  assert.equal(res.status, 400);
  assert.match((await res.json()).message, /password/);
});

test('POST /signup accepts the legacy payload shape and returns 201', async () => {
  const res = await post('/signup', { username: 'n@x.com', password: 'p', role: 'admin', security_ans1: '1999' });
  assert.equal(res.status, 201);
  assert.equal((await res.json()).user.role, 'patient');
});

test('POST /reset-password succeeds', async () => {
  const res = await post('/reset-password', { username: 'u@x.com', ans1: '1999', newPassword: 'x' });
  assert.equal(res.status, 200);
});

test('GET /patients/:id and POST /patient return the patient', async () => {
  const a = await fetch(`${baseUrl}/patients/ved`);
  assert.equal(a.status, 200);
  assert.equal((await a.json()).patient_id, 'ved');
  const b = await post('/patient', { patientId: 'ved' });
  assert.equal(b.status, 200);
});

test('unknown patient returns 404', async () => {
  const res = await fetch(`${baseUrl}/patients/nobody`);
  assert.equal(res.status, 404);
});

test('malformed JSON returns 400', async () => {
  const res = await post('/login', null, '{bad json');
  assert.equal(res.status, 400);
});

test('unknown route returns a JSON 404', async () => {
  const res = await fetch(`${baseUrl}/nope`);
  assert.equal(res.status, 404);
  assert.ok((await res.json()).message);
});

test('GET /health reflects database state', async () => {
  healthy = true;
  assert.equal((await fetch(`${baseUrl}/health`)).status, 200);
  healthy = false;
  assert.equal((await fetch(`${baseUrl}/health`)).status, 503);
});
