# Hospital Management System Demo (Medcare)

A full-stack hospital management demo built around a **layered architecture**:
a React front end, an Express/MySQL API server, and a separate **facade**
service that other systems use to look up patient records.

| Part | Folder | Default port | What it does |
| --- | --- | --- | --- |
| View / Content service | [`react-app/`](react-app) | `3000` | Public landing page, login, sign-up, password reset, role-based dashboards |
| API / Data service | [`Server/`](Server) | `3001` | REST API for authentication and patient records, backed by MySQL |
| Facade service | [`PatientDetails/`](PatientDetails) | `3100` | "Other hospital" portal that fetches patient details through the API |
| Database service | [`DB/`](DB) | `3306` | MySQL 8 schema and seed data |

## Tech stack

- **Front end:** React 18.2, React Router 6, Create React App
- **Back end:** Node.js 20+, Express 4
- **Database:** MySQL 8.0 via `mysql2` (promise pool)
- **Password hashing:** `bcryptjs` (pure JS, no native build step)
- **Testing:** Jest + React Testing Library (front end), `node:test` (API server)

## Quick start

### Prerequisites

- Node.js **20.6 or newer** (the facade needs 18+ for built-in `fetch`)
- MySQL **8.0**

### 1. Create the database

```bash
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS softwarearchitecture"
for f in DB/*.sql; do mysql -u root -p softwarearchitecture < "$f"; done
```

### 2. Start the API server

```bash
cd Server
npm install
cp .env.example .env   # then edit the DB credentials
npm run start:env      # or: npm start (uses defaults / exported env vars)
```

Check it is up: `curl http://localhost:3001/api/health` returns
`{"status":"ok","database":"up"}` (or `503` with `"database":"down"` if MySQL is unreachable).

### 3. Start the React app

```bash
cd react-app
npm install
npm start              # opens http://localhost:3000
```

### 4. (Optional) Start the facade

```bash
cd PatientDetails
npm install
npm start              # opens http://localhost:3100
```

Enter a patient ID such as `ved`, `Sai` or `Dylan` from the seed data.

> **Demo accounts:** the seed rows with the literal password `password` were inserted
> before hashing was added, so they cannot log in. Create an account through the
> **Sign Up** page; it is stored with a bcrypt hash and the `patient` role. To try the
> provider/admin dashboards, change that account's `role` in `login_cred` directly.

## Configuration

All settings come from environment variables; defaults match local development.

**API server (`Server/.env`)**

| Variable | Default | Purpose |
| --- | --- | --- |
| `PORT` | `3001` | HTTP port |
| `CORS_ORIGIN` | `*` | Allowed browser origin (set to `http://localhost:3000` outside local dev) |
| `DB_HOST` / `DB_PORT` | `localhost` / `3306` | MySQL location |
| `DB_USER` / `DB_PASSWORD` | `root` / `password` | MySQL credentials |
| `DB_NAME` | `softwarearchitecture` | Database name |
| `DB_CONNECTION_LIMIT` | `10` | Pool size |
| `BCRYPT_SALT_ROUNDS` | `10` | Password hashing cost |

**React app (`react-app/.env`)**: `REACT_APP_API_URL` (default `http://localhost:3001/api`).

**Facade**: `PORT` (default `3100`), `API_URL` (default `http://localhost:3001/api`),
`UPSTREAM_TIMEOUT_MS` (default `5000`).

## API reference

All endpoints are under `/api`. Every error response has the shape `{ "message": "..." }`.

| Method | Path | Body | Success | Errors |
| --- | --- | --- | --- | --- |
| `GET` | `/health` | – | `200 { status, database }` | `503` database down |
| `POST` | `/login` | `{ username, password }` | `200 { message, user: { username, role, email } }` | `400` missing fields, `401` invalid credentials |
| `POST` | `/signup` | `{ email_id \| username, password, security_ans1 }` | `201 { message, user }` | `400`, `409` account exists |
| `POST` | `/reset-password` | `{ username, ans1, newPassword }` | `200 { message }` | `400`, `401` wrong email or answer |
| `GET` | `/patients/:patientId` | – | `200` patient record | `404` not found |
| `POST` | `/patient` | `{ patientId }` | `200` patient record | `400`, `404` (kept for older clients) |

Patient records are returned as
`{ patient_id, department, contact, health_concerns, primary_physician, admission_status }`.

## Software architecture

The system is split into layers that each have one job. Every source file is
tagged with a comment naming its layer.

```
Browser ──► View / Content (React)  ─┐
                                     │ HTTP (JSON)
Other hospital ──► Facade ───────────┤
                                     ▼
                   Mapping layer (Express routes, validation middleware)
                                     ▼
                   Business rules (services: auth, patients)
                                     ▼
                   Extraction layer (repositories + SQL queries)
                                     ▼
                   Connection layer (mysql2 pool, env config)
                                     ▼
                   Database layer (MySQL)
```

### API server layout (`Server/`)

```
server.js                  entry point: starts HTTP server, checks DB, graceful shutdown
src/app.js                 composition root: wires repositories → services → routes
src/config/                configuration layer (environment variables)
src/db/connection.js       connection layer (pool + health ping)
src/repositories/          extraction layer (all SQL in queries.js)
src/services/              business rules (auth + patient rules)
src/routes/                mapping layer (HTTP ↔ service calls)
src/middleware/            validation, async error forwarding, error/404 handlers
src/utils/                 HttpError helpers, validation helpers
test/                      unit + HTTP tests (run without MySQL)
```

Dependencies are passed in (`createApp({ authService, patientService, healthCheck })`),
so each layer can be tested in isolation with fakes.

### The layers

1. **Database layer – MySQL.** Relational schema in [`DB/`](DB): `login_cred`, `patients`, `physicians`, `pharmacy`.
2. **Connection layer – `src/db/connection.js`.** A lazily connecting `mysql2` pool configured from the environment, so the API starts even if MySQL is still booting and reports its state on `/api/health`.
3. **Extraction layer – `src/repositories/`.** Every SQL statement lives in `queries.js` and is executed with parameter placeholders (no string concatenation, so no SQL injection). Repositories also hide schema quirks, e.g. the `pattient_id` column is exposed as `patient_id`.
4. **Mapping layer – `src/routes/`.** Express routers translate HTTP requests into service calls, with `requireFields` validating input first.
5. **Business rules – `src/services/` and `react-app/src/authentication_rules/`.** Passwords are hashed with bcrypt; self sign-up always creates a `patient` (the role is decided by the server, not the client); after login each role is sent to its own dashboard (`/patient`, `/provider`, `/admin`).
6. **Content layer – reusable React components.** `PasswordInput`, `Dashboard`, and the landing page cards (`StatCard`, `ServiceCard`, `DoctorCard`, `ReviewCard`). Landing page text lives in `LandingPage/content.js`, separate from markup.
7. **View layer – React.** `App.js` maps URLs to pages; pages are lazy-loaded so each route only downloads its own code.
8. **Security layer.** Role-protected routes on the front end; server never returns password hashes or security answers; request size limits; required-field validation; `x-powered-by` disabled; the facade renders data with `textContent` to prevent XSS.
9. **Error handling layer.** Services throw typed `HttpError`s (`400/401/404/409`); a single error middleware maps them to JSON and hides internals behind `500 Internal server error`. On the client, `api/client.js` turns every failure (including "server down") into one `ApiError`.
10. **Message layer – alerts.** UI components show the server's message (e.g. "Invalid username or password", "Wrong Email id or Security Answer!") via alerts.
11. **Hosting layer.** Everything runs on the local machine; hosts, ports and URLs are configurable through environment variables.
12. **Persistence layer.** Images are stored locally and bundled at build time; the login session is kept in the browser's `sessionStorage`.

## Micro-services

1. **Database service** – MySQL run locally.
2. **API / Data service** – Express server with a `mysql2` connection pool, its own port, health check, and centralized error handling.
3. **View / Content service** – React app on its own port that calls the API with error handling.
4. **Facade service** – `PatientDetails`, described below.

## Facade

**Objective:** improve scalability and maintainability by putting a server layer between external clients and the data server.

- The **facade** (`PatientDetails/server.js`) receives requests from clients and hides the system's internals.
- The **API server** focuses only on querying and processing data, acting as a data provider to the facade.

**Workflow**

1. *Client request* – the browser posts a patient ID to the facade (`POST /getPatientDetails`).
2. *Facade* – validates the ID and calls the API (`GET /api/patients/:id`) with a timeout.
3. *Data server* – retrieves and processes the record.
4. *Response relay* – the API's status code and body are passed back (`404` stays `404`; an unreachable API becomes `502`).
5. *Client delivery* – the page renders the record.

**Benefits:** decoupled architecture (clients never talk to the data layer directly),
load distribution, and an easy place to add more servers or services later.

## Testing

```bash
cd Server && npm test        # 18 tests: auth rules + every HTTP endpoint, no MySQL needed
cd react-app && npm test     # 31 tests: auth forms, login flow, role protection, landing page
```

## Known limitations / next steps

- Login state lives in `sessionStorage`, which is fine for a demo but not real authentication: the API does not issue tokens, and `/api/patients` is not access-controlled. A production version should use signed sessions or JWTs and protect patient data on the server.
- Security answers are stored in plain text (kept for compatibility with existing rows).
- The appointment form on the landing page confirms the request in the browser only; there is no booking endpoint yet.
- `physicians` and `pharmacy` tables exist in the schema but have no API endpoints yet.
- The landing page stylesheet uses global selectors, so its font and capitalization also apply to the auth pages.

## Database Design 
ER Diagram:
![image](https://github.com/user-attachments/assets/b1dde789-7a1f-4cd5-a0e0-2fca81f8ac46)

## Screen UI Design

![image](https://github.com/user-attachments/assets/54638837-aa93-4eeb-954e-b09c40d0b458)

![image](https://github.com/user-attachments/assets/57d87e10-5717-4f99-8b63-18a778f9c603)

![image](https://github.com/user-attachments/assets/e4a48ac8-6d71-424d-bcd0-92f81c0c20d4)

![image](https://github.com/user-attachments/assets/b162d863-0140-447c-a330-b6ac1234e7c8)

