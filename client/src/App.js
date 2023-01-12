import { useState } from 'react';
import './App.css';
import DeleteUserForm from './components/DeleteUserForm/DeleteForm';
import GetAllUsers from './components/GetAllUsers/GetAllUsers';
import GetUser from './components/GetUser/GetUser';
import Header from './components/Header/Header';
import LoginForm from './components/LoginForm/LoginForm';
import UpdateUserForm from './components/UpdateUserForm/UpdateUSerForm';
import HeaderContext from './store/header-context';
import LoginContext from './store/login-context';

function App() {
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('loggedInUser') || false)
  const [selected, setSelected] = useState('profile')
  const value = { selected, setSelected }
  const loginValue = { loggedIn, setLoggedIn }  

  return (
    <HeaderContext.Provider value={value}>
      <LoginContext.Provider value={loginValue}>
        {loggedIn && <Header />}
        {!loggedIn && <LoginForm />}
      </LoginContext.Provider>
      {loggedIn && selected === 'profile' && <GetUser />}
      {loggedIn && selected === 'getAllUsers' && <GetAllUsers />}
      {loggedIn && selected === 'updateUser' && <UpdateUserForm />}
      {loggedIn && selected === 'deleteUser' && <DeleteUserForm />}
    </HeaderContext.Provider>
  );
}

export default App;
