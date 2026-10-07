// CONFIGURATION LAYER: every tunable value comes from the environment,
// with defaults that match the local development setup.

const toInt = (value, fallback) => {
  const parsed = Number.parseInt(value, 10);
  return Number.isNaN(parsed) ? fallback : parsed;
};

const config = Object.freeze({
  port: toInt(process.env.PORT, 3001),
  corsOrigin: process.env.CORS_ORIGIN || '*',
  bcryptSaltRounds: toInt(process.env.BCRYPT_SALT_ROUNDS, 10),
  db: Object.freeze({
    host: process.env.DB_HOST || 'localhost',
    port: toInt(process.env.DB_PORT, 3306),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'softwarearchitecture',
    connectionLimit: toInt(process.env.DB_CONNECTION_LIMIT, 10),
  }),
});

export default config;
