import { Op } from 'sequelize';

export const DEFAULT_LIMIT = 20;

export const DEFAULT_OFFSET = 0;

const LIMIT_DATE = new Date().setMonth(new Date().getMonth() - 3);

export const PENDING_FILTER = {
  entryDate: {
    [Op.lte]: LIMIT_DATE,
  },
  departureDate: {
    [Op.is]: null,
  },
};
