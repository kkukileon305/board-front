import axios from 'axios';
import { Link, Route, Routes } from 'react-router-dom';
import useCheckLogin from './hooks/useCheckLogin';
import Login from './pages/Login';
import Main from './pages/Main';
import Register from './pages/Register';
import { useUserStore } from './zustand/store';

const App = () => {
  const isLogin = useUserStore(store => store.isLogin);
  useCheckLogin(isLogin);

  return (
    <Routes>
      <Route path='/' element={<Main />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
    </Routes>
  );
};
export default App;
