import { createContext, useState, useEffect, useContext } from 'react';
import { changeUser } from '../api/firebase';
import { login, logout } from '../api/firebase';

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(undefined);
  const handleUser = (info) => setUser(info);

  useEffect(() => {
    changeUser(handleUser)
  }, [])

  return <UserContext.Provider value={{ user, uid: user && user.uid, handleUser, login, logout }}>{children}</UserContext.Provider>
}

export function useUserContext() {
  return useContext(UserContext);
}