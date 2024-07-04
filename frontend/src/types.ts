import { RegisterOptions } from 'react-hook-form';

export type RepairNoteType = {
  id: number;
  client: string;
  phoneNumber: string;
  model: string;
  malfunction: string;
  entryDate: Date | string;
  departureDate: Date | null;
  isRepaired: boolean | null;
  details: string | null;
  garanty: boolean | null;
  budget: number | null;
};

export type RepairNoteKeys = keyof RepairNoteType;

export type InputsType = {
  label: string;
  name: RepairNoteKeys;
  type: 'text' | 'number' | 'checkbox' | 'date' | 'textarea';
  options?: RegisterOptions<RepairNoteType>;
};
