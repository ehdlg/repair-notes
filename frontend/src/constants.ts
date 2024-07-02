import { InputsType } from './types';

export const API_URL = import.meta.env.VITE_API_URL;

export const NAVBAR_ELEMENTS: { url: string; name: string }[] = [
  {
    url: '/notas',
    name: 'Notas de reparación',
  },
  {
    url: '/nueva',
    name: 'Crear nueva nota',
  },
  {
    url: '/pendientes',
    name: 'Notas de reparación pendientes',
  },
];

export const DEFAULT_PAGE = 1;

export const DEFAULT_SIZE = 50;

export const CREATE_INPUTS: InputsType[] = [
  {
    label: 'Cliente',
    defaultValue: '',
    name: 'client',
    type: 'text',
    options: {
      required: false,
    },
  },
  {
    label: 'Máquina',
    defaultValue: '',
    name: 'model',
    type: 'text',
    options: {
      required: false,
    },
  },
  {
    label: 'Máquina/Avería',
    defaultValue: '',
    name: 'malfunction',
    type: 'text',
    options: {
      required: false,
    },
  },
  {
    label: 'Número de telefono',
    defaultValue: '',
    name: 'phoneNumber',
    type: 'text',
    options: {
      required: false,
    },
  },
  {
    label: 'Fecha de entrada',
    defaultValue: new Date(),
    name: 'entryDate',
    type: 'date',
    options: {
      required: false,
    },
  },

  {
    label: 'Garantía',
    defaultValue: '',
    name: 'garanty',
    type: 'checkbox',
    options: {
      required: false,
    },
  },
] as const;

export const EDIT_INPUTS: InputsType[] = CREATE_INPUTS.map((input) => {
  return { ...input, options: { required: false } };
}).concat([
  {
    label: 'Fecha de salida',
    defaultValue: undefined,
    name: 'departureDate',
    options: { required: false },
    type: 'date',
  },
  {
    label: '¿Está reparada?',
    defaultValue: false,
    name: 'isRepaired',
    options: { required: false },
    type: 'checkbox',
  },
  {
    label: 'Presupuesto',
    name: 'budget',
    defaultValue: 0,
    options: { required: false },
    type: 'number',
  },
]);
