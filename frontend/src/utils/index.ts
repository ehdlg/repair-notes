import { DEFAULT_PAGE, DEFAULT_SIZE } from '../constants';

export function calculatePagination(page: number, size: number) {
  page = page > 0 ? page : DEFAULT_PAGE;
  size = size > 0 ? size : DEFAULT_SIZE;

  const limit = size;
  const offset = (page - 1) * limit;

  return { limit, offset };
}

export function formatDateToInput(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
