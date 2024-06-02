import { useEffect, useState } from 'react';
import { getAllMahasiswaAPI } from '../../constant/api';
import { useMahasiswaContext, useMahasiswaDispatch } from '../../hooks/useMahasiswaContext';

const useFetchMahasiswa = () => {
  const [loading, setLoading] = useState(false);
  const mahasiswa = useMahasiswaContext();
  const dispatch = useMahasiswaDispatch();

  useEffect(() => {
    const getAllMahasiswa = async () => {
      setLoading(true);
      try {
        const data = await getAllMahasiswaAPI();
        dispatch({ type: 'SET_MAHASISWA_DATA', payload: data });
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getAllMahasiswa();
  }, [dispatch]);
  return { loading, mahasiswa };
};

export default useFetchMahasiswa;
