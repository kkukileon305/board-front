import { useUserStore } from '../zustand/store';

const UserInfo = () => {
  const user = useUserStore(store => store.user);

  return (
    <div className='sticky top-0 w-[300px] h-[calc(100vh-112px)] p-4'>
      {user ? (
        <div className='flex gap-4 items-end'>
          <h2 className='font-bold text-xl'>{user.username}</h2>
          <p>{user.email}</p>
        </div>
      ) : (
        <div>
          <h2>로그인해주세요</h2>
        </div>
      )}
    </div>
  );
};
export default UserInfo;
