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
    defaultValue: new Date(),
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
] as const;

export const EDIT_INPUTS: InputsType[] = CREATE_INPUTS.concat([
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
