import { DEFAULT_PAGE, DEFAULT_SIZE } from '../constants';

export function calculatePagination(page: number, size: number) {
  page = page > 0 ? page : DEFAULT_PAGE;
  size = size > 0 ? size : DEFAULT_SIZE;

  const limit = size;
  const offset = (page - 1) * limit;

  return { limit, offset };
}
