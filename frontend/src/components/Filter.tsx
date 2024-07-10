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
    <label className='flex gap-2'>
      <input type='radio' name='filter' value={value} onChange={update} checked={checked} />
      <span>{label}</span>
    </label>
  );
}

export default Filter;
