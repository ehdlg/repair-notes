import { UserIcon, DevicePhoneMobileIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { RepairNoteType } from '../types';

function Note({ note }: { note: RepairNoteType }) {
  const state = note.garanty
    ? 'Garantía'
    : null != note.budget
    ? `Presupuestado: ${note.budget} €`
    : 'Sin presupuestar';

  return (
    <Link to={`/${note.id}`}>
      <div className='bg-white rounded-lg hover:shadow-2xl w-full p-5 border text-center border-gray-200 flex flex-col gap-4 transition ease-in duration-100 text-gray-700  hover:-translate-y-2 '>
        <h2 className='text-3xl font-bold  mb-1'>{note.id}</h2>

        <span className='text-xl'>{note.model}</span>

        <div className='flex justify-around gap-6 text-lg'>
          <span className='text-md flex flex-col items-center gap-2'>
            <UserIcon className='size-5' />
            {note.client}
          </span>
          <span className='text-md flex flex-col items-center gap-2'>
            <DevicePhoneMobileIcon className='size-5' />
            {note.phoneNumber}
          </span>
        </div>

        <div className='flex w-full items-center justify-between mt-4'>
          <div
            className={`py-2 px-4  rounded-lg text-white ${
              note.isRepaired ? 'bg-green-400' : 'bg-red-400'
            }`}
          >
            <span>{note.isRepaired ? 'Reparado' : 'No reparado'}</span>
          </div>
          <div className='text-md'>
            <span>{state}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Note;
