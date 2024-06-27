/* eslint-disable @typescript-eslint/no-namespace */
import {
  CreationOptional,
  InferCreationAttributes,
  InferAttributes,
  Model,
  CreationAttributes,
} from 'sequelize';

export type ValidatedDataType = {
  limit?: number;
  offset?: number;
} & Partial<CreationAttributes<IDeliveryNote>>;

declare global {
  namespace Express {
    interface Request {
      validatedData?: ValidatedDataType;
    }
  }
}

export interface IDeliveryNote
  extends Model<InferAttributes<IDeliveryNote>, InferCreationAttributes<IDeliveryNote>> {
  id: CreationOptional<number>;
  client: string;
  phoneNumber: string;
  model: string;
  malfunction: string;
  entryDate: CreationOptional<Date>;
  departureDate: CreationOptional<Date> | null;
  isRepaired: CreationOptional<boolean> | null;
  garanty: CreationOptional<boolean>;
  budget: CreationOptional<number> | null;
}
