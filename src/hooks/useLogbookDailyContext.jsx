import { useContext } from 'react';
import { LogbookDailyContext, LogbookDailyDispatch } from '../context/LogbookDailyContext';

export const useLogbookDailyContext = () => {
  return useContext(LogbookDailyContext);
};

export const useLogbookDailyDispatch = () => {
  return useContext(LogbookDailyDispatch);
};
