import Search from './Search';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

function Navbar() {
  return (
    <div className='sticky top-0 h-12 bg-white border-b border-gray-200 p-2 opacity-90 shadow-sm'>
      <nav className='flex justify-around items-center h-full mx-auto'>
        <Link to={'/'}>
          <img src={logo} alt='Logo Talleres Electromecanicos Lupiañez' className='h-4 w-fit ' />
        </Link>
        <Search />
        <Link to='/nueva'>
          <PlusCircleIcon className='size-8 text-gray-700 hover:bg-gray-700 hover:text-white rounded-full transition ease-in' />
        </Link>
      </nav>
    </div>
  );
}

export default Navbar;
