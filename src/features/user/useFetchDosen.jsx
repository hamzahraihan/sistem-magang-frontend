import { useEffect, useState } from 'react';
import { getAllDosenAPI } from '../../constant/api';
import { useDosenContext, useDosenDispatch } from '../../hooks/useDosenContext';

const useFetchDosen = () => {
  const [loading, setLoading] = useState(false);
  const { dosen } = useDosenContext();
  const dispatch = useDosenDispatch();

  useEffect(() => {
    const getAllDosen = async () => {
      setLoading(true);
      try {
        const data = await getAllDosenAPI();
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
