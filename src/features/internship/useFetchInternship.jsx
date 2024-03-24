import { useEffect, useState } from 'react';
import { useInternshipContext, useInternshipDispatch } from '../../hooks/useInternshipContext';
import { getInternshipByUser } from '../../constant/api';
import { useUserContext } from '../../hooks/useUserContext';

const useFetchInternship = () => {
  const [loading, setLoading] = useState(false);
  const { userLoggedInData } = useUserContext();
  const { internship } = useInternshipContext();
  const dispatch = useInternshipDispatch();

  useEffect(() => {
    const getUserInternship = async () => {
      setLoading(true);
      try {
        const data = await getInternshipByUser(userLoggedInData.id);
        dispatch({ type: 'SET_INTERNSHIP_DATA', payload: data });
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    getUserInternship();
  }, [dispatch, userLoggedInData]);

  return { loading, internship };
};

export default useFetchInternship;
