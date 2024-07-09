function PaginationButton({
  show,
  onClick,
  Icon,
}: {
  show: boolean;
  onClick: () => void;
  Icon: React.ForwardRefExoticComponent<Omit<React.SVGProps<SVGSVGElement>, 'ref'>>;
}) {
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
}

export default PaginationButton;
