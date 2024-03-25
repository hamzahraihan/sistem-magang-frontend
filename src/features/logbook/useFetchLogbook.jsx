import { useEffect, useMemo, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { getInternshipUser } from '../../constant/api';
import { useLogbookContext, useLogbookDipatch } from '../../hooks/useLogbookContext';

const useFetchLogbook = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useLogbookDipatch();
  const { logbook } = useLogbookContext();
  const { state } = useLocation();
  const { id } = useParams();
  const internID = useMemo(() => {
    return state ? state.internshipID : id;
  }, [state, id]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const getInternshipLogbook = async () => {
      setLoading(true);
      try {
        const data = await getInternshipUser(internID, signal);
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
  }, [dispatch, internID]);
  return { logbook, loading };
};

export default useFetchLogbook;
