import { useContext } from 'react';
import { UserContext, UserDispatch } from '../context/UserContext';

export const useUserContext = () => {
  return useContext(UserContext);
};

export const useUserDispatch = () => {
  return useContext(UserDispatch);
};
