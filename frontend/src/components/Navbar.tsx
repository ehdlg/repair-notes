import { Link } from 'react-router-dom';
import { NAVBAR_ELEMENTS } from '../constants';
import Search from './Search';

function Navbar() {
  return (
    <div className='sticky top-0 h-12 bg-white border-b border-gray-200 p-2 opacity-90'>
      <nav className='flex justify-around items-center h-full mx-auto'>
        <Link to={'/'}>
          <img
            src='logo.png'
            alt='Logo Talleres Electromecanicos Lupiañez'
            className='h-4 object-contain'
          />
        </Link>
        <Search />
        <ul className='flex justify-between gap-10'>
          {NAVBAR_ELEMENTS.map((element) => {
            return (
              <li key={element.url} className='list-none'>
                <Link to={element.url} className='cursor-pointer text-l text-gray-600'>
                  {element.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
