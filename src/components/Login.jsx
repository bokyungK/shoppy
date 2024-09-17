import React from 'react';
import { useUserContext } from '../context/UserContext';

export default function Login() {
  const { user, login, logout } = useUserContext();

  return (
      <button id='login' onClick={user ? logout : login} className='w-[max] h-[36px] px-[10px]'>{ user ? 'Logout' : 'Login' }</button>
  );
}

