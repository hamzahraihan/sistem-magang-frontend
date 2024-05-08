import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useLogbookWeeklyActivityContext, useLogbookWeeklyActivityDispatch } from '../../hooks/useLogbookWeeklyActivityContext';
import { getWeeklyLogByIdAPI } from '../../constant/api';
import { TOKEN } from '../../constant/key';
import toast from 'react-hot-toast';

// fetch weekly logbook data by logbook id
const useFetchWeeklyActivity = () => {
  const [loading, setLoading] = useState(false);
  const { logbook_id } = useParams();
  console.log('🚀 ~ useFetchWeeklyActivity ~ logbook_id:', logbook_id);
  const dispatch = useLogbookWeeklyActivityDispatch();
  const { weeklyActivity } = useLogbookWeeklyActivityContext();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const getWeeklyActivityById = async () => {
      setLoading(true);
      const token = localStorage.getItem(TOKEN);
      try {
        const data = await getWeeklyLogByIdAPI(logbook_id, token, signal);
        dispatch({ type: 'SET_WEEK_ACTIVITY', payload: data });
        setLoading(false);
      } catch (error) {
        if (error.response.status === 403) {
          toast.error('Anda tidak mempunyai hak akses. Pastikan Anda sudah login dengan akun dan role yang benar.');
        }
        if (error.name == 'CanceledError') {
          console.error('Previous request was aborted');
        } else {
          console.error(error);
        }
        setLoading(false);
      }
    };
    getWeeklyActivityById();
    return () => {
      controller.abort();
    };
  }, [dispatch, logbook_id]);
  return { loading, weeklyActivity };
};

export default useFetchWeeklyActivity;
