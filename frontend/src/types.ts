import { RegisterOptions } from 'react-hook-form';
import { ALL_CONDITIONS } from './constants';

export type RepairNoteType = {
  id: number;
  client: string;
  phoneNumber: string;
  model: string;
  malfunction: string;
  entryDate: Date | string;
  departureDate: Date | null | string;
  isRepaired: boolean | null;
  details: string | null;
  garanty: boolean | null;
  budget: number | null;
};

export type MachineType = {
  malfunction: string;
  model: string;
};

export type FormType = Omit<Partial<RepairNoteType>, 'model' | 'malfunction'> & {
  machines: MachineType[];
};

export type RepairNoteKeys = keyof FormType;

type InputType = 'text' | 'number' | 'checkbox' | 'date' | 'textarea' | 'tel';

export type FormInput = {
  label: string;
  name: RepairNoteKeys;
  type: InputType;
  options?: RegisterOptions;
};

export type FilterType = (typeof ALL_CONDITIONS)[number];
