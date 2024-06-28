import express from 'express';
import { initDb } from './db';
import repairNoteRoute from './routes/';
import { errorHandler, notFound } from './middlewares';
import 'dotenv/config';

const app = express();
const { PORT } = process.env;

async function main() {
  try {
    await initDb();

    console.log(`Listening on: http://localhost:${PORT}`);
  } catch (error) {
    console.error(error);
  }
}

app.use(express.json());

app.use('/api', repairNoteRoute);

app.use(notFound);

app.use(errorHandler);

app.listen(PORT, main);
