import axios from 'axios';
import { Link, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Main from './pages/Main';
import Register from './pages/Register';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Main />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
    </Routes>
  );
};
export default App;
