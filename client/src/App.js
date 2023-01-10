import { useState } from 'react';
import './App.css';
import CreateAUserForm from './components/CreateAUserForm/CreateAUserForm';
import DeleteUserForm from './components/DeleteUserForm/DeleteForm';
import GetAllUsers from './components/GetAllUsers/GetAllUsers';
import GetUserForm from './components/GetUserForm/GetUserForm';
import Header from './components/Header/Header';
import LoginForm from './components/LoginForm/LoginForm';
import UpdateUserForm from './components/UpdateUserForm/UpdateUSerForm';
import HeaderContext from './store/header-context';
import LoginContext from './store/login-context';
// import HeaderContextProvider from './store/header-context';

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [selected, setSelected] = useState('createUser')
  const value = { selected, setSelected }
  const loginValue = { loggedIn, setLoggedIn }


  return (
    <HeaderContext.Provider value={value}>
      <LoginContext.Provider value={loginValue}>
        <Header />
        {!loggedIn && <LoginForm />}
      </LoginContext.Provider>
      {selected === 'createUser' && <CreateAUserForm />}
      {selected === 'getUser' && <GetUserForm />}
      {selected === 'getAllUsers' && <GetAllUsers />}
      {selected === 'updateUser' && <UpdateUserForm />}
      {selected === 'deleteUser' && <DeleteUserForm />}
    </HeaderContext.Provider>
  );
}

export default App;
