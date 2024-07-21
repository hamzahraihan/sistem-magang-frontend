import { useEffect, useState } from 'react';
import { getAllMahasiswaAPI } from '../../constant/api';
import { useMahasiswaContext, useMahasiswaDispatch } from '../../hooks/useMahasiswaContext';
import { TOKEN } from '../../constant/key';

const useFetchMahasiswa = () => {
  const [loading, setLoading] = useState(false);
  const mahasiswa = useMahasiswaContext();
  const dispatch = useMahasiswaDispatch();

  useEffect(() => {
    const token = localStorage.getItem(TOKEN);

    const getAllMahasiswa = async () => {
      setLoading(true);
      try {
        const data = await getAllMahasiswaAPI(token);
        dispatch({ type: 'SET_MAHASISWA_DATA', payload: data });
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    getAllMahasiswa();
  }, [dispatch]);
  return { loading, mahasiswa };
};

export default useFetchMahasiswa;
