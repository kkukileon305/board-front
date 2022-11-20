import { useState } from 'react';
import BoardInput from '../components/board/react-query/BoardInput';
import BoardList from '../components/board/react-query/BoardList';
import BoardSocketInput from '../components/board/socket/BoardSocketInput';
import BoardSocketList from '../components/board/socket/BoardSocketList';
import Button from '../components/Button';
import Nav from '../components/Nav';
import UserInfo from '../components/UserInfo';

const Main = () => {
  const [isSocket, setIsSocket] = useState(false);

  return (
    <>
      <header className='h-[112px] flex flex-col justify-end bg-gray-400'>
        <div className='max-w-[1280px] w-full h-full mx-auto px-8 py-4 flex flex-col md:flex-row md:items-end justify-between'>
          <h1 className='font-bold text-gray-600 text-2xl md:text-3xl'>Pratice Board</h1>
          <Nav />
        </div>
      </header>
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
