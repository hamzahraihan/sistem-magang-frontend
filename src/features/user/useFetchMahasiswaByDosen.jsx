import { useEffect, useState } from 'react';
import { useUserContext } from '../../hooks/useUserContext';
import { getMahasiswaByDosenAPI } from '../../constant/api';
import { TOKEN } from '../../constant/key';

const useFetchMahasiswaByDosen = () => {
  const [mahasiswaDosen, setMahasiswaDosen] = useState([]);
  const [loading, setLoading] = useState(false);
  const { userLoggedInData } = useUserContext();

  useEffect(() => {
    const token = localStorage.getItem(TOKEN);
    const getMahasiswaByDosen = async () => {
      setLoading(true);
      try {
        const data = await getMahasiswaByDosenAPI(userLoggedInData?.id, token);
        setMahasiswaDosen(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    getMahasiswaByDosen();
  }, [userLoggedInData?.id]);
  return { mahasiswaDosen, loading };
};

export default useFetchMahasiswaByDosen;
