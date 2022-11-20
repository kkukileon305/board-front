import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRef, useState } from 'react';
import useKeyPress from '../../hooks/useHotkeys';
import axiosInstance from '../../utils/axiosInstance';
import { useUserStore } from '../../zustand/store';

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

  const onKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = async e => {
    if (!textareaRef.current) return;

    if (e.key === 'Enter') {
      if (ctrlPressed) {
        setDisabled(true);

        try {
          e.preventDefault();
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
      } else {
        e.preventDefault();

        textareaRef.current.value += '\n';
      }
    }
  };

  return (
    <form className='m-4 p-4 flex flex-col border' onSubmit={e => e.preventDefault()}>
      <h2 className='w-full font-bold text-xl mb-4'>홈</h2>
      <textarea
        onChange={({ target: { value } }) => {
          setBody(value);
          setErrorMessage('');
        }}
        className='block p-2 w-full h-[100px] resize-none focus:outline-none'
        placeholder={'오늘의 글쓰기'}
        onKeyDown={onKeyDown}
        ref={textareaRef}
      />
      <div className='flex flex-row-reverse justify-between items-center'>
        <input //
          disabled={disabled}
          className='font-bold w-[80px] cursor-pointer text-white bg-gray-700 px-4 py-2 rounded-full mt-4 disabled:text-gray-600'
          type='submit'
          value={disabled ? '등록중' : '등록'}
        />
        {errorMessage && <p className='text-red-500'>{errorMessage}</p>}
      </div>
    </form>
  );
};
export default BoardInput;
