import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

const useFetchUserByID = () => {
  const [loading, setLoading] = useState(false);
  const [userByID, setUserByID] = useState({});

  const { state } = useLocation();

  const { roleUrl, mahasiswa_id } = useParams();

  const id = useMemo(() => {
    return state ? state.userId : mahasiswa_id;
  }, [state, mahasiswa_id]);

  useEffect(() => {
    const handleUserById = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/${roleUrl || 'mahasiswa'}/${id}`);
        setLoading(false);
        setUserByID(data.result);
      } catch (error) {
        console.error('No id params found');
      }
    };
    handleUserById();
  }, [roleUrl, id]);
  return { userByID, loading, setLoading };
};

export default useFetchUserByID;
