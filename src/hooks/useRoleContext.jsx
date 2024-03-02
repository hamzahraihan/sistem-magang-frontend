import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

export const useRoleContext = () => {
  return useContext(UserContext);
};
