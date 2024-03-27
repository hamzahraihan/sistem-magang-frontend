import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getInternshipUser } from '../../constant/api';
import { useLogbookContext, useLogbookDispatch } from '../../hooks/useLogbookContext';

const useFetchLogbook = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useLogbookDispatch();
  const { logbook } = useLogbookContext();

  const { internship_id } = useParams();
  console.log('🚀 ~ useFetchLogbook ~ internship_id:', internship_id);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const getInternshipLogbook = async () => {
      setLoading(true);
      try {
        const data = await getInternshipUser(internship_id, signal);
        dispatch({ type: 'SET_LOGBOOK_DATA', payload: data });
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    getInternshipLogbook();
    return () => {
      controller.abort();
    };
  }, [dispatch, internship_id]);
  return { logbook, loading };
};

export default useFetchLogbook;
