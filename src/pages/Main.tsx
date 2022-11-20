import { useState } from 'react';
import BoardInput from '../components/board/react-query/BoardInput';
import BoardList from '../components/board/react-query/BoardList';
import BoardSocketInput from '../components/board/socket/BoardSocketInput';
import BoardSocketList from '../components/board/socket/BoardSocketList';
import Button from '../components/Button';
import Header from '../components/Header';
import Modal from '../components/Modal';
import UserInfo from '../components/UserInfo';
import { useUserStore } from '../zustand/store';

const Main = () => {
  const [isSocket, setIsSocket] = useState(false);
  const isModal = useUserStore(store => store.isModal);

  return (
    <>
      {isModal && <Modal />}
      <Header />
      <main className='max-w-[1280px] w-full mx-auto px-1 md:px-4 flex'>
        <div className='w-full md:w-[calc(100%-300px)] px-4'>
          <div className='flex items-center justify-end gap-4 pt-4'>
            <p className='text-sm md:text-2xl'>{isSocket ? 'Socket' : 'React-Query'}</p>
            <Button onClick={() => setIsSocket(prev => !prev)} isTrue={isSocket} />
          </div>

          {isSocket ? (
            <>
              <BoardSocketInput />
              <BoardSocketList />
            </>
          ) : (
            <>
              <BoardInput />
              <BoardList />
            </>
          )}
        </div>
        <UserInfo />
      </main>
    </>
  );
};

export default Main;
