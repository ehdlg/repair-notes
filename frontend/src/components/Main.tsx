import { Outlet } from 'react-router-dom';

function Main() {
  return (
    <main className='col-span-7 row-span-4 w-4/5 my-12 mx-auto'>
      <Outlet />
    </main>
  );
}

export default Main;
