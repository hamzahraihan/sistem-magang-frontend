import { useEffect, useState } from 'react';
import { getReportByMahasiswaAPI } from '../../constant/api';
import { useUserContext } from '../../hooks/useUserContext';
import { TOKEN } from '../../constant/key';
import { useReportInternContext, useReportInternDispatch } from '../../hooks/useReportInternContext';

const useFetchReportByMahasiswa = () => {
  const [loading, setLoading] = useState(false);
  const { reportIntern } = useReportInternContext();
  const { userLoggedInData } = useUserContext();
  const dispatch = useReportInternDispatch();

  useEffect(() => {
    const token = localStorage.getItem(TOKEN);
    const getReportMahasiswa = async () => {
      setLoading(true);
      try {
        const data = await getReportByMahasiswaAPI(userLoggedInData?.id, token);
        dispatch({ type: 'SET_REPORT_DATA', payload: data });
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    getReportMahasiswa();
  }, [dispatch, userLoggedInData]);

  return { loading, reportIntern };
};

export default useFetchReportByMahasiswa;
