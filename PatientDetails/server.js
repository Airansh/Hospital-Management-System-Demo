// server.js

const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const PORT = 3100;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('PatientDetails')); // Serve static files from the 'PatientDetails' directory

// Define a route to serve the HTML file at the root path
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '', 'index.html'));
});

app.post('/getPatientDetails', async (req, res) => {
    const { patientID } = req.body;

    try {
        const response = await axios.post('http://localhost:3001/api/patient', { patientId: patientID });
        res.json(response.data);
        console.log(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching patient details' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});