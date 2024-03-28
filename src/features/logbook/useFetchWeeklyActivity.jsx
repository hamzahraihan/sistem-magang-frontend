import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useLogbookWeeklyActivityContext, useLogbookWeeklyActivityDispatch } from '../../hooks/useLogbookWeeklyActivityContext';
import { getWeeklyLogByIdAPI } from '../../constant/api';

const useFetchWeeklyActivity = () => {
  const [loading, setLoading] = useState(false);
  const { logbook_id } = useParams();
  const dispatch = useLogbookWeeklyActivityDispatch();
  const { weeklyActivity } = useLogbookWeeklyActivityContext();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const getWeeklyActivityById = async () => {
      setLoading(true);
      try {
        const data = await getWeeklyLogByIdAPI(logbook_id, signal);
        dispatch({ type: 'SET_WEEK_ACTIVITY', payload: data });
        setLoading(false);
      } catch (error) {
        if (error.name == 'CanceledError') {
          console.error('Previous request was aborted');
        } else {
          console.error(error);
        }
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
