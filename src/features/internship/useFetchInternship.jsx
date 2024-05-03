import { useEffect, useState } from 'react';
import { useInternshipContext, useInternshipDispatch } from '../../hooks/useInternshipContext';
import { getInternshipByUser } from '../../constant/api';
import { useUserContext } from '../../hooks/useUserContext';
import { TOKEN } from '../../constant/key';
import { useParams } from 'react-router-dom';

// fetch all internship data by user id
const useFetchInternship = () => {
  const [loading, setLoading] = useState(false);
  const { userLoggedInData } = useUserContext();
  const { mahasiswa_id } = useParams();
  const { internship } = useInternshipContext();
  const dispatch = useInternshipDispatch();

  useEffect(() => {
    const token = localStorage.getItem(TOKEN);
    const controller = new AbortController();
    const signal = controller.signal;
    const getUserInternship = async () => {
      setLoading(true);
      try {
        const data = await getInternshipByUser(userLoggedInData?.id, mahasiswa_id, token, signal);
        setLoading(false);
        dispatch({ type: 'SET_INTERNSHIP_DATA', payload: data });
      } catch (error) {
        if (error.response.status == 404) {
          dispatch({ type: 'SET_INTERNSHIP_DATA', payload: [] });
        }
        console.error(error);
        setLoading(false);
      }
    };
    getUserInternship();
    return () => {
      controller.abort();
    };
  }, [dispatch, userLoggedInData, mahasiswa_id]);

  return { loading, internship };
};

export default useFetchInternship;
