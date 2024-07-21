import { useEffect, useState } from 'react';
import { getReportByIdAPI } from '../../constant/api';
import { useReportInternContext, useReportInternDispatch } from '../../hooks/useReportInternContext';
import { TOKEN } from '../../constant/key';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

// fetch report data by report_id
const useFetchReportById = () => {
  const [loading, setLoading] = useState(false);
  const { reportIntern } = useReportInternContext();
  const { report_id } = useParams();
  const dispatch = useReportInternDispatch();

  useEffect(() => {
    const getReportInternship = async () => {
      setLoading(true);
      const token = localStorage.getItem(TOKEN);
      try {
        const data = await getReportByIdAPI(report_id, token);
        dispatch({ type: 'SET_REPORT_DATA', payload: data });
        setLoading(false);
      } catch (error) {
        if (error.response.status === 403) {
          toast.error('Anda tidak mempunyai hak akses. Pastikan Anda sudah login dengan akun dan role yang benar.');
        }

        setLoading(false);
        dispatch({ type: 'SET_REPORT_DATA', payload: null });
      }
    };
    getReportInternship();
  }, [dispatch, report_id]);

  return { loading, reportIntern };
};

export default useFetchReportById;
