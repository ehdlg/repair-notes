import { RepairNoteType } from '../types';

function Note({ note }: { note: RepairNoteType }) {
  return (
    <div className='bg-white rounded-lg shadow-lg p-4 border border-slate-200 flex flex-col gap-1'>
      <h2 className='text-3xl font-semibold text-gray-800 mb-2'>{note.id}</h2>

      <span className='text-xl text-gray-600'>{note.model}</span>

      <span className='text-md text-gray-500'>Cliente: {note.client}</span>

      <div className='flex w-full justify-between mt-4'>
        <div className='py-1 px-3 bg-green-500 rounded-lg text-white'>
          <span>Reparado</span>
        </div>
        <div className='text-gray-700 text-md'>
          <span>
            {note.garanty
              ? 'Garantía'
              : note.budget != null
              ? `${note.budget}€`
              : 'Sin presupuesto'}
          </span>
        </div>
      </div>

      <button className='mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600'>
        Detalles
      </button>
    </div>
  );
}

export default Note;
