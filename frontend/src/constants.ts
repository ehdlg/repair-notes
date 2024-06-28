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
