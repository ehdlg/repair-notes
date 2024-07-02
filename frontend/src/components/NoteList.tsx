import Note from './Note';
import useNotes from '../hooks/useNotes';
import Loading from './Loading';

function NoteList() {
  const { rows: notes, error, isLoading } = useNotes('/?');

  if (isLoading) return <Loading />;

  if (error) return null;

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
