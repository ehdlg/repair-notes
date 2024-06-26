import { CreationAttributes } from 'sequelize';
import DeliveryNoteModel from '../db';
import { IDeliveryNote } from '../db/types';
import { DEFAULT_LIMIT, DEFAULT_OFFSET } from '../constants';

export default class DeliveryNote {
  static async getAll({
    LIMIT = DEFAULT_LIMIT,
    OFFSET = DEFAULT_OFFSET,
  }: {
    LIMIT?: number;
    OFFSET?: number;
  }) {
    const notes = await DeliveryNoteModel.findAll({
      limit: LIMIT,
      offset: OFFSET,
    });

    return notes;
  }

  static async create(
    newNote: CreationAttributes<IDeliveryNote>
  ): Promise<IDeliveryNote> {
    try {
      const note = DeliveryNoteModel.create(newNote);

      return note;
    } catch (error) {
      throw error;
    }
  }
}
