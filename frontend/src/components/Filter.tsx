import { FilterType } from '../types';
function Filter({
  value,
  label,
  update,
  checked,
}: {
  value: FilterType;
  label: string;
  update: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
}) {
  return (
    <label className='flex flex-col-reverse gap-2 cursor-pointer '>
      <input
        className='hidden'
        type='radio'
        name='filter'
        value={value}
        onChange={update}
        checked={checked}
      />
      <span
        className={`text-gray-700 hover:underline underline-offset-8  ${
          checked && 'text-gray-800 font-bold hover:no-underline'
        }`}
      >
        {label}
      </span>
    </label>
  );
}

export default Filter;
