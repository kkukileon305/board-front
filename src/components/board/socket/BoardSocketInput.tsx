import { useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';
import useKeyPress from '../../../hooks/useHotkeys';
import { useUserStore } from '../../../zustand/store';

const socket = io('http://localhost:4000', { autoConnect: false });

const BoardSocketInput = () => {
  const token = useUserStore(store => store.token);
  const [body, setBody] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const ctrlPressed = useKeyPress('Control');

  const handleSubmit = async () => {
    if (!textareaRef.current) return;

    socket.emit('post', { body, token });
    textareaRef.current.value = '';
    setBody('');
  };

  const onKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = async e => {
    if (!textareaRef.current) return;

    textareaRef.current.style.height = 'inherit';
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight + 10}px`;

    if (e.key === 'Enter') {
      if (ctrlPressed) {
        handleSubmit();
      } else {
        e.preventDefault();
        textareaRef.current.value += '\n';
      }
    }
  };

  useEffect(() => {
    socket.connect();
    socket.on('error', res => setErrorMessage(res.message));

    return () => {
      socket.off('error');
      socket.disconnect();
    };
  }, []);

  return (
    <form className='my-4 px-4 py-2 flex flex-col border' onSubmit={e => e.preventDefault()}>
      <h2 className='w-full font-bold text-xl mb-4'>홈</h2>
      <textarea
        onChange={({ target: { value } }) => {
          setBody(value);
          setErrorMessage('');
        }}
        className='block w-full h-[74px] resize-none border-b scrollbar-none focus:outline-none'
        placeholder={'오늘의 글쓰기'}
        onKeyDown={onKeyDown}
        ref={textareaRef}
      />
      <div className='flex flex-row-reverse justify-between items-center'>
        <input //
          className='font-bold w-[80px] cursor-pointer text-white bg-gray-700 px-4 py-2 rounded-full mt-2 disabled:text-gray-600'
          type='submit'
          value={'등록'}
          onClick={handleSubmit}
        />
        {errorMessage && <p className='text-red-500'>{errorMessage}</p>}
      </div>
    </form>
  );
};
export default BoardSocketInput;
