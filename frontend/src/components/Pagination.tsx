import PaginationButton from './PaginationButton';
import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

function Pagination({
  page,
  pageCount,
  update,
}: {
  page: number;
  pageCount: number;
  update: { next: () => void; prior: () => void };
}) {
  const showForward = page + 1 <= pageCount;
  const showPrior = page - 1 > 0;

  return (
    <div className='flex w-1/2 justify-center items-center gap-10 mx-auto mt-8'>
      <PaginationButton Icon={ArrowLeftIcon} onClick={update.prior} show={showPrior} />
      <span className='text-2xl text-gray-700 font-semibold'>{page}</span>
      <PaginationButton Icon={ArrowRightIcon} onClick={update.next} show={showForward} />
    </div>
  );
}

export default Pagination;
