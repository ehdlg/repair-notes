import { CreationAttributes } from 'sequelize';
import DeliveryNoteModel from '../db';
import { IReparirNote } from '../types';
import { PENDING_FILTER } from '../constants';

export default class RepairNote {
  static async getAll({
    limit,
    offset,
  }: {
    limit: number;
    offset: number;
  }): Promise<{ rows: IReparirNote[]; count: number }> {
    const notes = await DeliveryNoteModel.findAndCountAll({
      limit,
      offset,
      order: [['id', 'DESC']],
    });

    return notes;
  }

  static async getOne(id: number): Promise<IReparirNote | null> {
    const note = await DeliveryNoteModel.findByPk(id);

    return note;
  }

  static async getPending(): Promise<{ rows: IReparirNote[]; count: number }> {
    const results = await DeliveryNoteModel.findAndCountAll({
      where: PENDING_FILTER,
    });

    return results;
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

  static async getStadistics() {
    const notesCount = await DeliveryNoteModel.count();
    const pendingNotesCount = await DeliveryNoteModel.count({
      where: PENDING_FILTER,
    });

    return { notesCount, pendingNotesCount };
  }
}
