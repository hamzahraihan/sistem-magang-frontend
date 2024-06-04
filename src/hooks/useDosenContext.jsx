import { useContext } from 'react';
import { DosenContext, DosenDispatch } from '../context/DosenContext';

export const useDosenContext = () => {
  return useContext(DosenContext);
};

export const useDosenDispatch = () => {
  return useContext(DosenDispatch);
};
