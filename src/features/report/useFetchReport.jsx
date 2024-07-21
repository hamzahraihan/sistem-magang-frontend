import { useEffect, useState } from 'react';
import { useReportInternContext, useReportInternDispatch } from '../../hooks/useReportInternContext';
import { getAllReportAPI } from '../../constant/api';
import { useUserContext } from '../../hooks/useUserContext';

const useFetchReport = () => {
  const [loading, setLoading] = useState();
  const dispatch = useReportInternDispatch();
  const { reportIntern } = useReportInternContext();
  const { accessToken } = useUserContext();
  useEffect(() => {
    const getAllReport = async () => {
      setLoading(true);
      try {
        const data = await getAllReportAPI(accessToken);
        dispatch({ type: 'SET_REPORT_DATA', payload: data });
        setLoading(false);
      } catch (error) {
        dispatch({ type: 'SET_REPORT_DATA', payload: [] });
      }
    };
    getAllReport();
  }, [dispatch, accessToken]);

  return { loading, reportIntern };
};

export default useFetchReport;
