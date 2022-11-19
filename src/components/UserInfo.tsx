import { useUserStore } from '../zustand/store';

const UserInfo = () => {
  const user = useUserStore(store => store.user);

  return (
    <div className='w-[300px] min-h-[calc(100vh-112px)] border-l p-4'>
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
