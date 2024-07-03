import { InputsType } from './types';

export const API_URL = import.meta.env.VITE_API_URL;

export const NAVBAR_ELEMENTS: { url: string; name: string }[] = [
  {
    url: '/notas',
    name: 'Notas de reparación',
  },
  {
    url: '/notas/nueva',
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
    label: 'Máquina/Modelo',
    defaultValue: '',
    name: 'model',
    type: 'text',
    options: {
      required: false,
    },
  },
  {
    label: 'Avería',
    defaultValue: '',
    name: 'malfunction',
    type: 'text',
    options: {
      required: false,
    },
  },
  {
    label: 'Número de telefono',
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
]);
