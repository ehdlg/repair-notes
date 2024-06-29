function Input({
  label,
  name,
  type,
  defaultValue,
}: {
  label: string;
  name: string;
  type: string;
  defaultValue: string | number | undefined;
}) {
  return (
    <label htmlFor='client' className='text-base text-gray-500 font-semibold '>
      {label}
      <input
        type={type}
        name={name}
        id={name}
        defaultValue={defaultValue}
        className='block font-normal text-gray-900 bg-gray-50 border w-3/4 border-gray-200 p-1 rounded-md'
      />
    </label>
  );
}

export default Input;
