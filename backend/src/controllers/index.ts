import DeliveryNote from '../models';
import { NextFunction, Request, Response } from 'express';
import { DEFAULT_LIMIT, DEFAULT_OFFSET } from '../constants';
import { HTTPError } from '../errors';
import { CreationAttributes } from 'sequelize';
import { IDeliveryNote, ValidatedDataType } from '../types';

export default class DeliveryNoteController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const limit = req.validatedData?.limit || DEFAULT_LIMIT;
      const offset = req.validatedData?.offset || DEFAULT_OFFSET;

      const notes = await DeliveryNote.getAll({ limit, offset });

      return res.json(notes);
    } catch (error) {
      next(error);
    }
  }

  static async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.validatedData?.id;

      if (null == id) {
        throw new HTTPError({ status: 400, message: 'Invalid ID' });
      }

      const note = await DeliveryNote.getOne(id);

      return res.json(note);
    } catch (error) {
      next(error);
    }
  }

  static async getPending(req: Request, res: Response, next: NextFunction) {
    try {
      const notes = await DeliveryNote.getPending();

      return res.json(notes);
    } catch (error) {
      next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const newNote = req.validatedData as CreationAttributes<IDeliveryNote>;

      const createdNote = await DeliveryNote.create(newNote);

      return res.status(201).json(createdNote);
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id, ...updateFields } = req.validatedData as ValidatedDataType;

      const updatedNote = await DeliveryNote.update(
        id as number,
        updateFields as CreationAttributes<IDeliveryNote>
      );

      return res.json(updatedNote);
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.validatedData?.id;

      if (null == id) {
        throw new HTTPError({ status: 400, message: 'Invalid ID' });
      }

      const deletedNote = await DeliveryNote.delete(id);
      const info =
        deletedNote > 0
          ? `Nota de entrega ${id} borrada correctamente`
          : `No existe la nota de entrega ${id}`;

      return res.json({ info });
    } catch (error) {
      next(error);
    }
  }
}
