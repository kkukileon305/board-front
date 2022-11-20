import { Link } from 'react-router-dom';
import { BiMenu } from 'react-icons/bi';
import { useUserStore } from '../zustand/store';

const Header = () => {
  const { user, setLogout, setIsModal } = useUserStore(({ user, setLogout, setIsModal }) => ({ user, setLogout, setIsModal }));

  const logout = () => setLogout();

  return (
    <header className='h-[112px] flex flex-col justify-end bg-gray-400'>
      <div className='max-w-[1280px] w-full h-full mx-auto px-8 py-4 flex flex-col items-end md:flex-row md:items-end justify-between'>
        <div className='w-full flex items-center'>
          <h1 className='w-full font-bold text-gray-600 text-2xl md:text-3xl'>Pratice Board</h1>
          <button onClick={() => setIsModal(true)} className='md:hidden'>
            <BiMenu size={40} />
          </button>
        </div>
        <nav>
          {user ? (
            <div className='flex items-center gap-4'>
              <p className='font-bold text-xl'>{user.username}</p>
              <button onClick={logout} className='font-bold text-white bg-gray-700 px-2 py-1 rounded-full'>
                Logout
              </button>
            </div>
          ) : (
            <div className='flex items-center gap-4 justify-end'>
              <Link className='font-bold md:text-xl text-white bg-gray-700 px-4 py-2 rounded-full' to={'/login'}>
                Login
              </Link>
              <Link className='font-bold md:text-xl text-white bg-gray-700 px-4 py-2 rounded-full' to={'/register'}>
                Register
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};
export default Header;
