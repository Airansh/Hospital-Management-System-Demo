import express, { urlencoded, json } from 'express';
import {router} from './apiRoutes/index.js';
import cors from 'cors'

const PORT = process.env.PORT || 3001;
const app = express();

app.use(urlencoded({ extended: false }));
app.use(json());
app.use(cors())

app.use('/api', router);

app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});