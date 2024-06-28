import useSwr from 'swr';
import { FetchError } from '../errors';
import { API_URL } from '../constants';
import { RepairNoteType } from '../types';

function useNotes(resource: string) {
  const URL = `${API_URL}${resource}`;

  const fetcher = async (url: string) => {
    const res = await fetch(url);

    if (!res.ok) {
      const info = await res.json();
      const status = res.status;

      const error = new FetchError('An error occurred while fetching the data.', info, status);

      throw error;
    }

    return res.json();
  };

  const { data, error, isLoading } = useSwr<{ count: number; rows: RepairNoteType[] }, FetchError>(
    URL,
    fetcher
  );

  return {
    count: data?.count,
    rows: data?.rows,
    error,
    isLoading,
  };
}

export default useNotes;
