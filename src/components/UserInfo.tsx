import { Link } from 'react-router-dom';
import { useUserStore } from '../zustand/store';

const UserInfo = () => {
  const user = useUserStore(store => store.user);

  return (
    <div className='hidden p-4 mt-4 md:block sticky top-4 w-[300px] h-[calc(100vh-144px)] border'>
      {user ? (
        <>
          <div className='flex gap-4 items-end'>
            <h2 className='font-bold text-xl'>{user.username}</h2>
            <p>{user.email}</p>
          </div>
          <p className='text-2xl text-right font-bold'>{user.position}</p>
        </>
      ) : (
        <div>
          <Link className='w-full aspect-square border flex items-center justify-center' to={'/login'}>
            로그인
          </Link>
        </div>
      )}
    </div>
  );
};
export default UserInfo;
