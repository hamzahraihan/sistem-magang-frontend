import { useContext } from 'react';
import { InternshipContext, InternshipDispatch } from '../context/InternshipContext';

export const useInternshipContext = () => {
  return useContext(InternshipContext);
};

export const useInternshipDispatch = () => {
  return useContext(InternshipDispatch);
};
