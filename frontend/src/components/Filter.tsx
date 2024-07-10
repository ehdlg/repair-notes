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
      <input type='radio' name='filter' value={value} onChange={update} checked={checked} />
      <span>{label}</span>
    </label>
  );
}

export default Filter;
