import express from 'express';
import DeliveryNote from './models';
import { initDb } from './db';
import { CreationAttributes } from 'sequelize';
import { IDeliveryNote } from './db/types';
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

app.get('/', async (req, res, next) => {
  const { limit, offset } = req.query;

  console.log(limit, offset);
  const notes = await DeliveryNote.getAll({ LIMIT: Number(limit), OFFSET: Number(offset) });

  return res.json(notes);
});

app.post('/', async (req, res, next) => {
  const newNote: CreationAttributes<IDeliveryNote> = req.body;

  try {
    const createdNote = await DeliveryNote.create(newNote);

    return res.json(createdNote);
  } catch (error) {
    next(error);
  }
});

app.use(notFound);

app.use(errorHandler);

app.listen(PORT, main);
