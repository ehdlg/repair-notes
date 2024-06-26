import express, { Request, Response } from 'express';
import DeliveryNote from './models';
import { initDb } from './db';
import { CreationAttributes } from 'sequelize';
import { IDeliveryNote } from './types';
import { errorHandler, notFound } from './middlewares';
import { validation, getRules } from './middlewares/validation';
import 'dotenv/config';
import { DEFAULT_LIMIT, DEFAULT_OFFSET } from './constants';

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

app.get('/', getRules, validation, async (req: Request, res: Response) => {
  const limit = req.validatedData?.limit || DEFAULT_LIMIT;
  const offset = req.validatedData?.offset || DEFAULT_OFFSET;

  const notes = await DeliveryNote.getAll({ limit, offset });

  return res.json(notes);
});

app.post('/', async (req, res, next) => {
  try {
    const newNote: CreationAttributes<IDeliveryNote> = req.body;
    const createdNote = await DeliveryNote.create(newNote);

    return res.json(createdNote);
  } catch (error) {
    next(error);
  }
});

app.use(notFound);

app.use(errorHandler);

app.listen(PORT, main);
