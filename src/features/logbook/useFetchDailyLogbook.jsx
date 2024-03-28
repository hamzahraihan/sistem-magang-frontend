import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDailyLogAPI } from '../../constant/api';
import { useLogbookDailyContext, useLogbookDailyDispatch } from '../../hooks/useLogbookDailyContext';

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
      try {
        const data = await getDailyLogAPI(logbook_id, signal);
        setLoading(false);
        dispatch({ type: 'SET_DAILYLOG', payload: data });
      } catch (error) {
        console.error(error);
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
