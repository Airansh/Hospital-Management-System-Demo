// FACADE SERVICE: a thin server that sits in front of the API (data) server.
// Clients only talk to this service; it forwards requests and relays responses.

const express = require('express');
const path = require('path');

const PORT = Number(process.env.PORT) || 3100;
const API_URL = (process.env.API_URL || 'http://localhost:3001/api').replace(/\/$/, '');
const UPSTREAM_TIMEOUT_MS = Number(process.env.UPSTREAM_TIMEOUT_MS) || 5000;

const app = express();
app.disable('x-powered-by');
app.use(express.json({ limit: '10kb' }));

app.use(express.static(path.join(__dirname, 'public')));

app.post('/getPatientDetails', async (req, res) => {
  const patientID = String(req.body?.patientID ?? '').trim();
  if (!patientID) {
    return res.status(400).json({ message: 'Patient ID is required' });
  }

  try {
    const upstream = await fetch(`${API_URL}/patients/${encodeURIComponent(patientID)}`, {
      signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
    });
    const body = await upstream.json().catch(() => ({ message: 'Invalid response from API server' }));
    // Relay the data server's status so clients can tell "not found" from "failed".
    return res.status(upstream.status).json(body);
  } catch (error) {
    console.error('Facade could not reach the API server:', error.message);
    return res.status(502).json({ message: 'Patient service is currently unavailable' });
  }
});

app.listen(PORT, () => {
  console.log(`Facade (PatientDetails) running on http://localhost:${PORT} -> ${API_URL}`);
});
