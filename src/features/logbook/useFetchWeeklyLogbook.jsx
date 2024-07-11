import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getWeeklyLogAPI } from '../../constant/api';
import { useLogbookWeeklyContext, useLogbookWeeklyDispatch } from '../../hooks/useLogbookWeeklyContext';
import { TOKEN } from '../../constant/key';
import toast from 'react-hot-toast';

// fetch all log daily by week using internship id
const useFetchWeeklyLogbook = () => {
  const [loading, setLoading] = useState(false);
  const { internship_id } = useParams();
  const dispatch = useLogbookWeeklyDispatch();
  const { logbookWeekly } = useLogbookWeeklyContext();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const getWeeklyLog = async () => {
      setLoading(true);
      const token = localStorage.getItem(TOKEN);

      try {
        const data = await getWeeklyLogAPI(internship_id, token, signal);
        dispatch({ type: 'SET_WEEKLYLOG', payload: data });
        setLoading(false);
      } catch (error) {
        if (error.name == 'CanceledError') {
          console.error('Previous request was aborted');
        } else {
          if (error.response.status === 403) {
            toast.error('Anda tidak mempunyai hak akses. Pastikan Anda sudah login dengan akun dan role yang benar.');
          }
          console.error(error);
          setLoading(false);
        }
      }
    };
    getWeeklyLog();
    return () => {
      controller.abort();
    };
  }, [dispatch, internship_id]);
  return { loading, logbookWeekly };
};

export default useFetchWeeklyLogbook;
