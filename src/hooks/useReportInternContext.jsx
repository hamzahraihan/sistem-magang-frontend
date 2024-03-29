import { useContext } from 'react';
import { ReportInternContext, ReportInternDispatch } from '../context/ReportInternContext';

export const useReportInternContext = () => {
  return useContext(ReportInternContext);
};

export const useReportInternDispatch = () => {
  return useContext(ReportInternDispatch);
};
