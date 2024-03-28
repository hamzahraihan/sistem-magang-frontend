import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getWeeklyLogAPI } from '../../constant/api';
import { useLogbookWeeklyContext, useLogbookWeeklyDispatch } from '../../hooks/useLogbookWeeklyContext';

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
      try {
        const data = await getWeeklyLogAPI(internship_id, signal);
        dispatch({ type: 'SET_WEEKLYLOG', payload: data });
        setLoading(false);
      } catch (error) {
        if (error.name == 'CanceledError') {
          console.error('Previous request was aborted');
        } else {
          console.error(error);
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
