import { useContext } from 'react';
import { LogbookWeeklyActivityContext, LogbookWeeklyActivityDispatch } from '../context/LogbookWeelyActivityContext';

export const useLogbookWeeklyActivityContext = () => {
  return useContext(LogbookWeeklyActivityContext);
};

export const useLogbookWeeklyActivityDispatch = () => {
  return useContext(LogbookWeeklyActivityDispatch);
};
