import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import Input from '../components/Input';
import axiosInstance from '../utils/axiosInstance';
import useCheckLogin from '../hooks/useCheckLogin';
import { useUserStore } from '../zustand/store';
import { AxiosError } from 'axios';

export type Inputs = {
  email: string;
  password: string;
  username: string;
  position: string;
};

const Register = () => {
  const isLogin = useUserStore(store => store.isLogin);
  const { navigate } = useCheckLogin(isLogin);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<Inputs>();

  const { mutateAsync } = useMutation({
    mutationFn: (inputs: Inputs) => axiosInstance.post<{ message: string }>('/auth/register', inputs),
  });

  const onSubmit: SubmitHandler<Inputs> = async inputs => {
    try {
      await mutateAsync(inputs);
      navigate('/login');
    } catch (error) {
      if (!error) return;
      const { response } = error as AxiosError<{ message: string }>;

      if (!response) return;

      const {
        data: { message },
      } = response;

      console.log(message);

      setError('email', { message });
    }
  };

  return (
    <div className='min-h-[100vh] flex justify-center items-center bg-gray-300'>
      <form onSubmit={handleSubmit(onSubmit)} className='max-w-[500px] mx-4 w-full aspect-auto p-8 border border-gray-400 bg-white rounded-xl flex flex-col justify-center'>
        <h2 className='font-bold text-2xl mb-4'>회원가입</h2>
        <Input //
          error={errors.email}
          minLength={4}
          minLengthMessage={'최소 4글자 이상 입력해주세요'}
          normalMessage={'이메일'}
          register={register}
          requiredMessage={'이메일을 입력해주세요'}
          type={'email'}
        />
        <Input //
          error={errors.username}
          minLength={2}
          minLengthMessage={'최소 2글자 이상 입력해주세요'}
          normalMessage={'닉네임'}
          register={register}
          requiredMessage={'닉네임을 입력해주세요'}
          type={'username'}
        />
        <Input //
          error={errors.position}
          minLength={1}
          minLengthMessage={'최소 1글자 이상 입력해주세요'}
          normalMessage={'position'}
          register={register}
          requiredMessage={'position을 입력해주세요'}
          type={'position'}
        />
        <Input //
          error={errors.password}
          minLength={6}
          minLengthMessage={'최소 6글자 이상 입력해주세요'}
          normalMessage={'비밀번호'}
          register={register}
          requiredMessage={'비밀번호를 입력해주세요'}
          type={'password'}
        />
        <input className='block w-full py-2 bg-gray-400 rounded text-xl font-bold text-white cursor-pointer' type='submit' value='제출' />
        <div className='flex flex-col items-end mt-4 text-gray-400'>
          <Link className='font-bold text-blue-300' to={'/'}>
            돌아가기
          </Link>

          <p className='text-right mt-2'>
            계정이 이미 있다면{' '}
            <Link className='font-bold text-blue-300' to={'/login'}>
              로그인
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};
export default Register;
