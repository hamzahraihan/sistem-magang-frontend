import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getWeeklyLogAPI } from '../../constant/api';

const useFetchWeeklyLogbook = () => {
  const [weeks, setWeeks] = useState([]);
  const [loading, setLoading] = useState(false);
  const { internship_id } = useParams();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const getWeeklyLog = async () => {
      setLoading(true);
      try {
        const data = await getWeeklyLogAPI(internship_id, signal);
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
  }, [internship_id]);
  return { loading, weeks };
};

export default useFetchWeeklyLogbook;
