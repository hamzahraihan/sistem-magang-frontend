import { useEffect, useState } from 'react';
import { useInternshipContext, useInternshipDispatch } from '../../hooks/useInternshipContext';
import { getInternshipByUser } from '../../constant/api';
import { useUserContext } from '../../hooks/useUserContext';
import toast from 'react-hot-toast';
import { TOKEN } from '../../constant/key';

const useFetchInternship = () => {
  const [loading, setLoading] = useState(false);
  const { userLoggedInData } = useUserContext();
  const { internship } = useInternshipContext();
  const dispatch = useInternshipDispatch();

  useEffect(() => {
    const token = localStorage.getItem(TOKEN);
    const getUserInternship = async () => {
      setLoading(true);
      try {
        const data = await getInternshipByUser(userLoggedInData?.id, token);
        setLoading(false);
        dispatch({ type: 'SET_INTERNSHIP_DATA', payload: data });
      } catch (error) {
        if (error.response.status == 403) {
          toast.error('Kamu belum login');
        }
        console.error(error);
        setLoading(false);
      }
    };
    getUserInternship();
  }, [dispatch, userLoggedInData]);

  return { loading, internship };
};

export default useFetchInternship;
