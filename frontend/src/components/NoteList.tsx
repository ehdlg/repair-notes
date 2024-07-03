import Note from './Note';
import useNotes from '../hooks/useNotes';
import Loading from './Loading';
import { RepairNoteType } from '../types';

function NoteList() {
  const { data, error, isLoading } = useNotes<{count:number, rows: RepairNoteType[]}>('/?');

  if (isLoading) return <Loading />;

  if (error) return null;
  
  const notes = data?.rows

  return (
    <>
      <h2 className='mb-8 text-slate-800 text-3xl'>Notas de reparación</h2>
      <div className='grid grid-cols-5 grid-rows-4 gap-4 justify-center'>
        {notes?.map((note) => {
          return <Note note={note} />;
        })}
      </div>
    </>
  );
}
export default NoteList;
