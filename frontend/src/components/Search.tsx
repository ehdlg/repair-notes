import { FormEvent, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { MagnifyingGlassIcon as SearchIcon } from '@heroicons/react/24/outline';
import { toast } from 'sonner';

function Search() {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    const inputValue = inputRef.current?.value;

    if (null == inputValue || Number(inputValue) <= 0) {
      return toast.error('El ID de la nota no es válido, debe ser un número mayor a 0');
    }

    return navigate(`/${inputValue}`);
  };

  return (
    <form
      onSubmit={onSubmit}
      className='flex justify-center bg-gray-50 p-1 rounded focus-within:border-gray-300 focus-within:border-b-2 border w-3/4 mx-auto'
    >
      <input
        type='number'
        ref={inputRef}
        className='[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-nonebg-inherit rounded  outline-none bg-inherit text-center w-full text-2xl text-gray-700'
      />

      <button type='submit'>
        <SearchIcon className='text-gray-700 size-6' />
      </button>
    </form>
  );
}

export default Search;
