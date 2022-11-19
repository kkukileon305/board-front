import { Link } from 'react-router-dom';
import { useUserStore } from '../zustand/store';

const Nav = () => {
  const { user, setLogout } = useUserStore(({ user, setLogout }) => ({ user, setLogout }));

  const logout = () => setLogout();

  return (
    <nav>
      {user ? (
        <div className='flex items-center gap-4'>
          <p className='font-bold text-xl'>{user.username}님 안녕하세요</p>
          <button onClick={logout} className='font-bold text-xl text-white bg-gray-700 px-4 py-2 rounded-full'>
            Logout
          </button>
        </div>
      ) : (
        <div className='flex items-center gap-4'>
          <Link className='font-bold text-xl text-white bg-gray-700 px-4 py-2 rounded-full' to={'/login'}>
            Login
          </Link>
          <Link className='font-bold text-xl text-white bg-gray-700 px-4 py-2 rounded-full' to={'/register'}>
            Register
          </Link>
        </div>
      )}
    </nav>
  );
};
export default Nav;
