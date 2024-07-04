import { useId } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { InputsType } from '../types';
function Input({
  label,
  name,
  type,
  register,
  disabled = false,
}: InputsType & {
  register?: UseFormRegisterReturn;
  disabled?: boolean;
}) {
  const id = useId();

  if (type == 'textarea') {
    return (
      <label htmlFor={id} className='text-base w-full col-span text-gray-500 font-semibold'>
        {label}
        <textarea
          name={name}
          id={id}
          className='block font-normal text-gray-700 bg-gray-50 border w-11/12 h-56 border-gray-200 focus:border-gray-400 focus:border-2 p-1 rounded-md outline-none disabled:cursor-not-allowed disabled:opacity-50'
          disabled={disabled}
          {...register}
        />
      </label>
    );
  }

  return (
    <label htmlFor={id} className='text-base text-gray-500 font-semibold'>
      {label}
      <input
        type={type}
        name={name}
        id={id}
        className='block font-normal text-gray-700 bg-gray-50 border w-3/4 border-gray-200 focus:border-gray-400 focus:border-2 p-1 rounded-md outline-none disabled:cursor-not-allowed disabled:opacity-50'
        disabled={disabled}
        {...register}
      />
    </label>
  );
}

export default Input;
