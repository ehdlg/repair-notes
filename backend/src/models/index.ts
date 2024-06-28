import { CreationAttributes } from 'sequelize';
import DeliveryNoteModel from '../db';
import { IReparirNote } from '../types';
import { Op } from 'sequelize';

export default class RepairNote {
  static async getAll({
    limit,
    offset,
  }: {
    limit: number;
    offset: number;
  }): Promise<IReparirNote[]> {
    const notes = await DeliveryNoteModel.findAll({
      limit,
      offset,
    });

    return notes;
  }

  static async getOne(id: number): Promise<IReparirNote | null> {
    const note = await DeliveryNoteModel.findByPk(id);

    return note;
  }

  static async getPending(): Promise<IReparirNote[]> {
    const limitDate = new Date();
    limitDate.setMonth(limitDate.getMonth() - 3);

    const notes: IReparirNote[] = await DeliveryNoteModel.findAll({
      where: {
        entryDate: {
          [Op.lte]: limitDate,
        },
        departureDate: {
          [Op.is]: null,
        },
      },
    });

    return notes;
  }

  static async create(newNote: CreationAttributes<IReparirNote>): Promise<IReparirNote> {
    const note = await DeliveryNoteModel.create(newNote);

    return note;
  }

  static async delete(id: number) {
    const deletedNote = await DeliveryNoteModel.destroy({
      where: {
        id,
      },
    });

    return deletedNote;
  }

  static async update(
    id: number,
    updatedFields: Omit<Partial<CreationAttributes<IReparirNote>>, 'id'>
  ): Promise<[affectedCount: number]> {
    const updatedNote = DeliveryNoteModel.update(updatedFields, {
      where: {
        id,
      },
    });

    return updatedNote;
  }
}
