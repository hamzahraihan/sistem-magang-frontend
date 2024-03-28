import { useContext } from 'react';
import { LogbookWeeklyContext, LogbookWeeklyDispatch } from '../context/LogbookWeeklyContext';

export const useLogbookWeeklyContext = () => {
  return useContext(LogbookWeeklyContext);
};

export const useLogbookWeeklyDispatch = () => {
  return useContext(LogbookWeeklyDispatch);
};
