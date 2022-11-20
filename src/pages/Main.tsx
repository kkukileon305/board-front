import { useState } from 'react';
import BoardInput from '../components/board/BoardInput';
import BoardList from '../components/board/react-query/BoardList';
import BoardSocketList from '../components/board/socket/BoardSocketList';
import Nav from '../components/Nav';
import UserInfo from '../components/UserInfo';

const Main = () => {
  const [isSocket, setIsSocket] = useState(false);

  return (
    <>
      <header className='h-[112px] flex flex-col justify-end bg-gray-400'>
        <div className='max-w-[1280px] w-full h-full mx-auto px-8 pb-4 flex items-end justify-between'>
          <h1 className='font-bold text-gray-600 text-3xl'>Pratice Board</h1>
          <Nav />
        </div>
      </header>
      <main className='max-w-[1280px] w-full mx-auto px-4 flex'>
        <div className='w-[calc(100%-300px)]'>
          <BoardInput />
          {isSocket ? <BoardSocketList /> : <BoardList />}
        </div>
        <UserInfo />
      </main>
    </>
  );
};
export default Main;
