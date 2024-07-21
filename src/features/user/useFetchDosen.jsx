import { useEffect, useState } from 'react';
import { getAllDosenAPI } from '../../constant/api';
import { useDosenContext, useDosenDispatch } from '../../hooks/useDosenContext';
import { TOKEN } from '../../constant/key';

const useFetchDosen = () => {
  const [loading, setLoading] = useState(false);
  const { dosen } = useDosenContext();
  const dispatch = useDosenDispatch();

  useEffect(() => {
    const token = localStorage.getItem(TOKEN);
    const getAllDosen = async () => {
      setLoading(true);
      try {
        const data = await getAllDosenAPI(token);
        dispatch({ type: 'SET_DOSEN_DATA', payload: data });
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getAllDosen();
  }, [dispatch]);
  return { loading, dosen };
};

export default useFetchDosen;
