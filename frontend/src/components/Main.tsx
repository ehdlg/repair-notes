import { Outlet } from 'react-router-dom';

function Main() {
  return (
    <main className='2xl:max-w-[1700px] sm:max-w-4xl  mx-auto my-10'>
      <Outlet />
    </main>
  );
}

export default Main;
