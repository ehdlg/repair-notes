import { useState } from 'react';
import Note from './Note';
import Filter from './Filter';
import Loading from './Loading';
import Pagination from './Pagination';
import useNotes from '../hooks/useNotes';
import { FILTER_INPUTS, NOTE_LIMIT } from '../constants';
import { FilterType, RepairNoteType } from '../types';
import { calculatePagination, isFilterType } from '../utils';

function NoteList() {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState<FilterType>('all');

  const updatePage = {
    next: () => setPage((prevPage) => prevPage + 1),
    prior: () => setPage((prevPage) => prevPage - 1),
  };
  const updateFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFilter = e.target.value;

    if (!isFilterType(newFilter)) return;

    setFilter(newFilter);
    setPage(1);
  };

  const { limit, offset } = calculatePagination(page, NOTE_LIMIT);
  const { data, error, isLoading } = useNotes<{ count: number; rows: RepairNoteType[] }>(
    `/?limit=${limit}&offset=${offset}&condition=${filter}`
  );

  if (isLoading) return <Loading />;

  if (error || undefined == data) return null;

  const notes = data.rows;
  const pageCount = Math.ceil(data.count / NOTE_LIMIT);

  return (
    <>
      <div className='mb-8 w-full flex flex-col items-center gap-4 '>
        <h2 className='text-gray-700 text-3xl font-semibold'>Notas de reparación</h2>
        <div className='flex gap-12 w-fit p-4 rounded items-center self-center border border-gray-200 bg-white text-xl'>
          {FILTER_INPUTS.map((input) => {
            return (
              <Filter
                label={input.label}
                value={input.value}
                update={updateFilter}
                checked={input.value === filter}
              />
            );
          })}
        </div>
      </div>
      <div className='grid 2xl:grid-cols-5  grid-cols-3 gap-4 justify-center items-center'>
        {notes?.map((note) => {
          return <Note note={note} />;
        })}
      </div>
      <Pagination page={page} pageCount={pageCount} update={updatePage} />
    </>
  );
}
export default NoteList;
