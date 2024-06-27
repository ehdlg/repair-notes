import sequelize from './config';
import { DataTypes } from 'sequelize';
import { IDeliveryNote } from '../types';

const DeliveryNote = sequelize.define<IDeliveryNote>(
  'Nota',
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
    },
    client: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    phoneNumber: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    model: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    malfunction: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    entryDate: {
      allowNull: false,
      defaultValue: DataTypes.NOW,
      type: DataTypes.DATE,
    },
    departureDate: {
      defaultValue: null,
      type: DataTypes.DATE,
    },
    garanty: {
      allowNull: false,
      defaultValue: false,
      type: DataTypes.BOOLEAN,
    },
    isRepaired: {
      allowNull: false,
      defaultValue: false,
      type: DataTypes.BOOLEAN,
    },
    budget: {
      defaultValue: null,
      type: DataTypes.DOUBLE,
    },
  },
  {
    timestamps: false,
    validate: {
      budgetIfGaranty() {
        if (this.garanty && null != this.budget) {
          throw new Error('No puede haber presupuesto si la máquina tiene garantía.');
        }
      },
      checkDates() {
        if (
          this.departureDate != null &&
          (this.departureDate as Date) <= (this.entryDate as Date)
        ) {
          throw new Error('La fecha de salida no puede ser posterior a la fecha de entrada');
        }
      },
    },
  }
);

export async function initDb() {
  try {
    await sequelize.sync();
  } catch (error) {
    throw new Error('There was an error connecting to the database');
  }
}

export default DeliveryNote;
