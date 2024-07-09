import { useState } from 'react';
import Note from './Note';
import useNotes from '../hooks/useNotes';
import Loading from './Loading';
import Pagination from './Pagination';
import { NOTE_LIMIT } from '../constants';
import { RepairNoteType } from '../types';
import { calculatePagination } from '../utils';

function NoteList() {
  const [page, setPage] = useState(1);
  const updatePage = {
    next: () => setPage((prevPage) => prevPage + 1),
    prior: () => setPage((prevPage) => prevPage - 1),
  };

  const { limit, offset } = calculatePagination(page, NOTE_LIMIT);

  console.log(limit, offset);

  const { data, error, isLoading } = useNotes<{ count: number; rows: RepairNoteType[] }>(
    `/?limit=${limit}&offset=${offset}`
  );

  if (isLoading) return <Loading />;

  if (error || undefined == data) return null;

  const notes = data.rows;
  const noteCount = data.count;
  const pageCount = Math.ceil(noteCount / NOTE_LIMIT);

  return (
    <>
      <h2 className='mb-8 text-slate-800 text-3xl'>Notas de reparación</h2>
      <div className='grid grid-cols-5  gap-4 justify-center'>
        {notes?.map((note) => {
          return <Note note={note} />;
        })}
      </div>
      <Pagination page={page} pageCount={pageCount} update={updatePage} />
    </>
  );
}
export default NoteList;
