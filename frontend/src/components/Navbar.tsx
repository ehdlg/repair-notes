import { Link } from 'react-router-dom';
import { NAVBAR_ELEMENTS } from '../constants';
import Search from './Search';

function Navbar() {
  return (
    <aside className='row-span-5 bg-white border-r border-gray-200 dark:bg-slate-900 h-full shadow-[-16px_0px_28px_20px_#edf2f7]'>
      <nav className='flex flex-col items-start p-6 gap-10 sticky top-0 '>
        <Link to={'/'}>
          <img src='logo.png' alt='Logo Talleres Electromecanicos Lupiañez' />
          <div className='w-full m-1 h-[1px]  bg-gradient-to-r from-zinc-400 via-red-400 to-zinc-400'></div>
        </Link>
        <Search />
        <ul className='flex flex-col justify-center gap-4 '>
          {NAVBAR_ELEMENTS.map((element) => {
            return (
              <Link to={element.url} key={element.url}>
                <li className='cursor-pointer text-l text-gray-600'>{element.name}</li>
              </Link>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}

export default Navbar;
