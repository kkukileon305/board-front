import { useEffect, useRef, useState } from 'react';
import useKeyPress from '../../hooks/useHotkeys';

const BoardInput = () => {
  const [body, setBody] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const ctrlPressed = useKeyPress('Control');

  const onKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = e => {
    if (!textareaRef.current) return;

    if (e.key === 'Enter') {
      if (ctrlPressed) {
        e.preventDefault();
        console.log(JSON.stringify(body));
      } else {
        e.preventDefault();

        textareaRef.current.value += '\n';
      }
    }
  };

  return (
    <form className='p-4 flex flex-col items-end' onSubmit={e => e.preventDefault()}>
      <h2 className='w-full font-bold text-xl mb-4'>홈</h2>
      <textarea
        onChange={({ target: { value } }) => {
          setBody(value);
        }}
        className='block rounded-xl p-2 w-full h-[120px] border resize-none focus:outline-none'
        placeholder={'오늘의 글쓰기'}
        onKeyDown={onKeyDown}
        ref={textareaRef}
      />
      <input className='font-bold cursor-pointer text-white bg-gray-700 px-4 py-2 rounded-full mt-4' type='submit' value='글쓰기' />
    </form>
  );
};
export default BoardInput;
