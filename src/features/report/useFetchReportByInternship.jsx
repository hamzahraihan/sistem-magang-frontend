import { useEffect, useState } from 'react';
import { getReportByMahasiswaAPI } from '../../constant/api';
import { useReportInternContext, useReportInternDispatch } from '../../hooks/useReportInternContext';
import { useUserContext } from '../../hooks/useUserContext';
import { TOKEN } from '../../constant/key';

const useFetchReportByInternship = () => {
  const [loading, setLoading] = useState(false);
  const { reportIntern } = useReportInternContext();
  const { userLoggedInData } = useUserContext();
  const dispatch = useReportInternDispatch();

  useEffect(() => {
    const getReportInternship = async () => {
      setLoading(true);
      const token = localStorage.getItem(TOKEN);
      try {
        const data = await getReportByMahasiswaAPI(userLoggedInData?.id, token);
        dispatch({ type: 'SET_REPORT_DATA', payload: data });
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    getReportInternship();
  }, [dispatch, userLoggedInData]);
  return { loading, reportIntern };
};

export default useFetchReportByInternship;
