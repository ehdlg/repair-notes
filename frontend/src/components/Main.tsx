import { Outlet } from 'react-router-dom';

function Main() {
  return (
    <main className='max-w-[1500px] mx-auto my-8'>
      <Outlet />
    </main>
  );
}

export default Main;
