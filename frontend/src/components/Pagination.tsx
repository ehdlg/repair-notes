import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

const PaginationButton = ({
  show,
  onClick,
  Icon,
}: {
  show: boolean;
  onClick: () => void;
  Icon: React.ForwardRefExoticComponent<Omit<React.SVGProps<SVGSVGElement>, 'ref'>>;
}) => {
  return (
    <button
      onClick={onClick}
      disabled={!show}
      className={`p-2 rounded-full border border-gray-200 flex gap-2 ${
        !show ? 'opacity-0 disabled' : ''
      }`}
    >
      <Icon className='size-6 text-gray-700' />
    </button>
  );
};

Pagination.Button = PaginationButton;

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
      <Pagination.Button Icon={ArrowLeftIcon} onClick={update.prior} show={showPrior} />
      <span className='text-2xl text-gray-700 font-semibold'>{page}</span>
      <Pagination.Button Icon={ArrowRightIcon} onClick={update.next} show={showForward} />
    </div>
  );
}

export default Pagination;
