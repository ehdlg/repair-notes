import { CreationOptional, InferCreationAttributes, InferAttributes, Model } from 'sequelize';

export interface IDeliveryNote
  extends Model<InferAttributes<IDeliveryNote>, InferCreationAttributes<IDeliveryNote>> {
  id: CreationOptional<number>;
  client: string;
  phoneNumber: string;
  model: string;
  malfunction: string;
  entryDate: CreationOptional<Date>;
  departureDate: CreationOptional<Date>;
  isRepaired: CreationOptional<boolean>;
  garanty: CreationOptional<boolean>;
  budget: CreationOptional<number>;
}
