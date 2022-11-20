import { useUserStore } from '../zustand/store';

const Modal = () => {
  const { user, setIsModal } = useUserStore(({ user, setIsModal }) => ({ user, setIsModal }));

  return (
    <div className='fixed w-full h-full top-0 left-0 z-10 bg-gray-900/50 flex justify-center items-center' onClick={() => setIsModal(false)}>
      <div className='w-[200px] bg-white'>{user?.username}</div>
    </div>
  );
};
export default Modal;
