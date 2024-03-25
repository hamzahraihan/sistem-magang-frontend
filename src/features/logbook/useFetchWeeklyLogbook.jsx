import { useEffect, useMemo, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { getWeeklyLogAPI } from '../../constant/api';

const useFetchWeeklyLogbook = () => {
  const [weeks, setWeeks] = useState([]);
  const [loading, setLoading] = useState(false);
  const { state } = useLocation();
  const { id } = useParams();
  const internID = useMemo(() => {
    return state ? state.internshipID : id;
  }, [state, id]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const getWeeklyLog = async () => {
      setLoading(true);
      try {
        const data = await getWeeklyLogAPI(internID, signal);
        setWeeks(data);
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
  }, [internID]);
  return { loading, weeks };
};

export default useFetchWeeklyLogbook;
