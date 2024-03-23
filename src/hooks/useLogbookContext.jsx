import { useContext } from 'react';
import { LogbookContext, LogbookDispatch } from '../context/LogbookContext';

export const useLogbookContext = () => {
  return useContext(LogbookContext);
};

export const useLogbookDipatch = () => {
  return useContext(LogbookDispatch);
};
