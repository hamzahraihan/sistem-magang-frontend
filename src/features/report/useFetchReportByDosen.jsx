import { useEffect, useState } from 'react';
import { getReportByDosenIdAPI } from '../../constant/api';
import { useReportInternContext, useReportInternDispatch } from '../../hooks/useReportInternContext';
import { TOKEN } from '../../constant/key';
import toast from 'react-hot-toast';
import { useUserContext } from '../../hooks/useUserContext';

// fetch report data by internship id
const useFetchReportByDosen = () => {
  const [loading, setLoading] = useState(false);
  const { reportIntern } = useReportInternContext();
  const { userLoggedInData } = useUserContext();
  const dispatch = useReportInternDispatch();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const getReportInternship = async () => {
      setLoading(true);
      const token = localStorage.getItem(TOKEN);
      try {
        const data = await getReportByDosenIdAPI(userLoggedInData?.id, token, signal);
        console.log('🚀 ~ getReportInternship ~ data:', data);
        dispatch({ type: 'SET_REPORT_DATA', payload: data });
        setLoading(false);
      } catch (error) {
        if (error.response.status === 403) {
          toast.error('Anda tidak mempunyai hak akses. Pastikan Anda sudah login dengan akun dan role yang benar.');
        }
        console.error(error);
        setLoading(false);
        dispatch({ type: 'SET_REPORT_DATA', payload: null });
      }
    };
    getReportInternship();
    return () => {
      controller.abort();
    };
  }, [dispatch, userLoggedInData]);
  return { loading, reportIntern };
};

export default useFetchReportByDosen;
