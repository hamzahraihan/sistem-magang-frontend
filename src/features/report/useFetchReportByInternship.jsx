import { useEffect, useState } from 'react';
import { getReportByInternshipIdAPI } from '../../constant/api';
import { useReportInternContext, useReportInternDispatch } from '../../hooks/useReportInternContext';
import { TOKEN } from '../../constant/key';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

// fetch report data by internship id
const useFetchReportByInternship = () => {
  const [loading, setLoading] = useState(false);
  const { reportIntern } = useReportInternContext();
  const { internship_id } = useParams();
  const dispatch = useReportInternDispatch();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const getReportInternship = async () => {
      setLoading(true);
      const token = localStorage.getItem(TOKEN);
      try {
        const data = await getReportByInternshipIdAPI(internship_id, token, signal);
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
  }, [dispatch, internship_id]);
  return { loading, reportIntern };
};

export default useFetchReportByInternship;
