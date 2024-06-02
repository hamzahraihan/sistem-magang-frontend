import { useContext } from 'react';
import { MahasiswaContext, MahasiswaDispatch } from '../context/MahasiswaContext';

export const useMahasiswaContext = () => {
  return useContext(MahasiswaContext);
};

export const useMahasiswaDispatch = () => {
  return useContext(MahasiswaDispatch);
};
