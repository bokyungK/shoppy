import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';
import Loading from './ui/Loading';

export default function ProtectedRoute({ children, isRequireAdmin }) {
  const { user } = useUserContext();

  if (user === undefined) { 
    return <Loading />
  }

  if (user && (!isRequireAdmin || user.isAdmin)) {
    return children;
  }

  return <Navigate to='/' replace></Navigate>
}
