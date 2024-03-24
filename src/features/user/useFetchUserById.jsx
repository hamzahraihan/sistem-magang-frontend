import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

const useFetchUserByID = () => {
  const [loading, setLoading] = useState(false);
  const [userByID, setUserByID] = useState({});

  const { state } = useLocation();

  const { roleUrl } = useParams();

  const id = useMemo(() => {
    return state ? state.userId : null;
  }, [state]);

  useEffect(() => {
    const handleUserById = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/${roleUrl}/${id}`);
        setUserByID(data.result);
        setLoading(false);
      } catch (error) {
        console.error('No id params found');
      }
    };
    handleUserById();
  }, [roleUrl, id]);
  return { userByID, loading, setLoading };
};

export default useFetchUserByID;
