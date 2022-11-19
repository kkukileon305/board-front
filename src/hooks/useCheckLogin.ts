import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useCheckLogin = (isLogin: boolean) => {
  const navigate = useNavigate();

  useEffect(() => {
    isLogin && navigate('/');
  }, [isLogin]);

  return { navigate };
};

export default useCheckLogin;
