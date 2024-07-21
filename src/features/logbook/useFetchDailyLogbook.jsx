import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDailyLogAPI } from '../../constant/api';
import { useLogbookDailyContext, useLogbookDailyDispatch } from '../../hooks/useLogbookDailyContext';
import { TOKEN } from '../../constant/key';
import toast from 'react-hot-toast';

// fetch all log daily by logbook id
const useFetchDailyLogbook = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useLogbookDailyDispatch();
  const { logbookDaily } = useLogbookDailyContext();

  const { logbook_id } = useParams();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const getDailyLog = async () => {
      setLoading(true);
      const token = localStorage.getItem(TOKEN);
      try {
        const data = await getDailyLogAPI(logbook_id, token, signal);
        setLoading(false);
        dispatch({ type: 'SET_DAILYLOG', payload: data });
      } catch (error) {
        if (error.response.status === 403) {
          toast.error('Anda tidak mempunyai hak akses. Pastikan Anda sudah login dengan akun dan role yang benar.');
        }
        dispatch({ type: 'SET_DAILYLOG', payload: [] });

        setLoading(false);
      }
    };
    getDailyLog();
    return () => {
      controller.abort();
    };
  }, [dispatch, logbook_id]);
  return { logbookDaily, loading };
};

export default useFetchDailyLogbook;
