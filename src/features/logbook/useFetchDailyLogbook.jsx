import { useEffect, useMemo, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { getDailyLogAPI } from '../../constant/api';

const useFetchDailyLogbook = () => {
  const [daily, setDaily] = useState([]);
  const [loading, setLoading] = useState(false);

  const { state } = useLocation();
  const { id } = useParams();
  const internID = useMemo(() => {
    return state ? state.internshipID : id;
  }, [state, id]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const getDailyLog = async () => {
      setLoading(true);
      try {
        const data = await getDailyLogAPI(internID, signal);
        setDaily(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    getDailyLog();
    return () => {
      controller.abort();
    };
  }, [internID]);
  return { daily, loading };
};

export default useFetchDailyLogbook;
