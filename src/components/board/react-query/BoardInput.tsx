import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRef, useState } from 'react';
import useKeyPress from '../../../hooks/useHotkeys';
import axiosInstance from '../../../utils/axiosInstance';
import { useUserStore } from '../../../zustand/store';

const BoardInput = () => {
  const token = useUserStore(store => store.token);
  const [body, setBody] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const ctrlPressed = useKeyPress('Control');

  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: () => axiosInstance.post('/board', { body, token }),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ['getPosts'],
      }),
  });

  const handleSubmit = async () => {
    if (!textareaRef.current) return;
    setDisabled(true);

    try {
      await mutateAsync();
      setDisabled(false);
      textareaRef.current.value = '';
      setBody('');
    } catch (error) {
      setDisabled(false);
      const { response } = error as AxiosError<{ message: string }>;
      if (!response) return;
      setErrorMessage(response.data.message);
    }
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
          disabled={disabled}
          className='font-bold w-[80px] cursor-pointer text-white bg-gray-700 px-4 py-2 rounded-full mt-2 disabled:text-gray-600'
          type='submit'
          value={disabled ? '등록중' : '등록'}
          onClick={handleSubmit}
        />
        {errorMessage && <p className='text-red-500'>{errorMessage}</p>}
      </div>
    </form>
  );
};
export default BoardInput;
