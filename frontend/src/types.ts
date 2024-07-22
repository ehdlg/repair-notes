import { RegisterOptions } from 'react-hook-form';
import { ALL_CONDITIONS } from './constants';

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

type InputType = 'text' | 'number' | 'checkbox' | 'date' | 'textarea' | 'tel';

export type FormInput = {
  label: string;
  name: RepairNoteKeys;
  type: InputType;
  options?: RegisterOptions<RepairNoteType>;
};

export type FilterType = (typeof ALL_CONDITIONS)[number];
