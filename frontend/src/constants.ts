import { FilterType, InputsType, RepairNoteKeys } from './types';
import { formatDateToInput } from './utils';

export const API_URL = import.meta.env.VITE_API_URL;

//TODO update names
export const NAVBAR_ELEMENTS: { url: string; name: string }[] = [
  {
    url: '/',
    name: 'N',
  },
  {
    url: '/nueva',
    name: 'C',
  },
  {
    url: '/pendientes',
    name: 'NP',
  },
];

export const DEFAULT_PAGE = 1;

export const DEFAULT_SIZE = 50;

export const CREATE_INPUTS: InputsType[] = [
  {
    label: 'Cliente',
    name: 'client',
    type: 'text',
    options: {
      required: {
        value: true,
        message: 'El nombre del cliente es obligatorio',
      },
    },
  },
  {
    label: 'Máquina/Modelo',
    name: 'model',
    type: 'text',
    options: {
      required: {
        value: true,
        message: 'El nombre de la máquina es obligatorio',
      },
    },
  },
  {
    label: 'Avería',
    name: 'malfunction',
    type: 'text',
    options: {
      required: {
        value: true,
        message: 'La avería de la máquina es obligatoria',
      },
    },
  },
  {
    label: 'Número de telefono',
    name: 'phoneNumber',
    type: 'text',
    options: {
      required: {
        value: true,
        message: 'El número de teléfono del cliente es obligatorio',
      },
      pattern: { value: /^[0-9]{9}$/, message: 'El número de teléfono debe tener 9 dígitos' },
    },
  },
  {
    label: 'Fecha de entrada',
    name: 'entryDate',
    type: 'date',
    options: {
      required: {
        value: true,
        message: 'La fecha de entrada es obligatoria',
      },
      valueAsDate: true,
    },
  },
  {
    label: 'Garantía',
    name: 'garanty',
    type: 'checkbox',
    options: {
      required: false,
    },
  },
  {
    label: 'Detalles',
    name: 'details',
    type: 'textarea',
    options: {
      required: false,
    },
  },
] as const;

export const EDIT_INPUTS: InputsType[] = [
  ...CREATE_INPUTS.filter((input) => input.name !== 'details'),
  {
    label: 'Fecha de salida',
    name: 'departureDate',
    options: { required: false },
    type: 'date',
  },
  {
    label: '¿Está reparada?',
    name: 'isRepaired',
    options: { required: false },
    type: 'checkbox',
  },
  {
    label: 'Presupuesto',
    name: 'budget',
    options: { required: false },
    type: 'number',
  },
  CREATE_INPUTS.find((input) => input.name === 'details')!,
];

export const DEFAULT_FORM_VALUES = {
  client: '',
  garanty: false,
  entryDate: formatDateToInput(new Date()),
  malfunction: '',
  phoneNumber: '',
  details: null,
};

export const REQUIRED_VALUES: RepairNoteKeys[] = [
  'client',
  'entryDate',
  'malfunction',
  'model',
  'phoneNumber',
];

export const NOTE_LIMIT = 15;

export const ALL_CONDITIONS = ['all', 'repaired', 'not-repaired', 'pending'] as const;

export const FILTER_INPUTS: { value: FilterType; label: string }[] = [
  {
    value: 'all',
    label: 'Todas',
  },
  {
    value: 'repaired',
    label: 'Reparadas',
  },
  {
    value: 'not-repaired',
    label: 'Sin reparar',
  },
  {
    value: 'pending',
    label: 'Pendientes de recoger',
  },
];
