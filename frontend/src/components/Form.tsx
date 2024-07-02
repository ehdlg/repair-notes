import { FormEvent, PropsWithChildren } from 'react';

function Form({
  children,
  onSubmit,
  title,
}: PropsWithChildren & {
  onSubmit: (e: FormEvent) => void;
  title: string;
}) {
  return (
    <form
      onSubmit={onSubmit}
      className='flex flex-col  bg-white border-gray-200 border-2 p-4 w-1/2 rounded-md m-auto h-auto shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]'
    >
      <div className='border-b border-gray-200 flex mb-8'>
        <h2 className='text-2xl text-gray-800 mt-2 pb-4 font-bold '>{title}</h2>
      </div>
      <div className='grid grid-cols-2 mx-4 gap-8 mb-12'>{children}</div>
      <button
        type='submit'
        className='self-end mr-20 bg-gray-100 hover:bg-gray-200 border-b-2 border-red-400 py-2 mb-4 px-4 rounded hover:border-red-700 transition ease-in-out'
      >
        Enviar
      </button>
    </form>
  );
}

export default Form;
