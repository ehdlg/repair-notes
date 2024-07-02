import { useId } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { InputsType } from '../types';
import { formatDateToInput } from '../utils';
function Input({
  label,
  name,
  type,
  defaultValue,
  register,
  disabled = false,
}: InputsType & {
  register?: UseFormRegisterReturn;
  disabled?: boolean;
}) {
  const id = useId();
  return (
    <label htmlFor={id} className='text-base text-gray-500 font-semibold'>
      {label}
      <input
        type={type}
        name={name}
        id={id}
        defaultValue={
          type != 'date'
            ? defaultValue?.toString()
            : defaultValue != null
            ? formatDateToInput(defaultValue as Date)
            : ''
        }
        defaultChecked={type == 'checkbox' && Boolean(defaultValue)}
        className='block font-normal text-gray-700 bg-gray-50 border w-3/4 border-gray-200 p-1 rounded-md disabled:cursor-not-allowed disabled:opacity-50'
        disabled={disabled}
        {...register}
      />
    </label>
  );
}

export default Input;
