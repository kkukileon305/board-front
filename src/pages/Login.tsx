import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useUserStore } from '../zustand/store';
import { SubmitHandler, useForm } from 'react-hook-form';
import Input from '../components/Input';
import { useMutation } from '@tanstack/react-query';
import axiosInstance from '../utils/axiosInstance';
import { LoginResponseBody } from '../interface';
import useCheckLogin from '../hooks/useCheckLogin';
import { useState } from 'react';

export type LoginInputs = {
  email: string;
  password: string;
};

const Login = () => {
  const { setLogin, isLogin } = useUserStore(({ setLogin, isLogin }) => ({ setLogin, isLogin }));
  const [disabled, setDisabled] = useState(false);
  useCheckLogin(isLogin);

  const [isLoginFail, setIsLoginFail] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>();

  const { mutateAsync } = useMutation({
    mutationFn: (inputs: LoginInputs) => axiosInstance.post<LoginResponseBody>('/auth/login', inputs),
  });

  const onSubmit: SubmitHandler<LoginInputs> = async inputs => {
    setDisabled(true);
    try {
      const {
        data: { user, token },
      } = await mutateAsync(inputs);

      if (user && token) {
        setLogin({ token, user });
      }
      setDisabled(false);
      setIsLoginFail(false);
    } catch (error) {
      console.log(error);
      setIsLoginFail(true);
      setDisabled(false);
    }
  };

  return (
    <div className='min-h-[100vh] flex justify-center items-center bg-gray-300'>
      <form onSubmit={handleSubmit(onSubmit)} className='max-w-[500px] w-full aspect-auto p-8 border border-gray-400 bg-white rounded-xl flex flex-col justify-center'>
        <h2 className='font-bold text-2xl mb-4'>로그인</h2>
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
          error={errors.password}
          minLength={6}
          minLengthMessage={'최소 6글자 이상 입력해주세요'}
          normalMessage={'비밀번호'}
          register={register}
          requiredMessage={'비밀번호를 입력해주세요'}
          type={'password'}
        />
        <p className='text-red-500 text-center mb-4 h-[24px]'>{isLoginFail ? '아이디와 비밀번호를 확인해주세요' : ''}</p>
        <input //
          className='block w-full py-2 bg-gray-400 rounded text-xl font-bold text-white cursor-pointer disabled:text-gray-600'
          type='submit'
          value={disabled ? ' 로그인중...' : '로그인'}
          disabled={disabled}
        />
        <div className='flex items-center justify-between mt-4 text-gray-400'>
          <Link className='font-bold text-blue-300' to={'/'}>
            메인 페이지로 돌아가기
          </Link>
          <p className='text-right'>
            계정이 없다면{' '}
            <Link className='font-bold text-blue-300' to={'/register'}>
              회원가입
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};
export default Login;
