import { useEffect, useState } from 'react';
import { getReportByMahasiswaAPI } from '../../constant/api';
import { useUserContext } from '../../hooks/useUserContext';
import { TOKEN } from '../../constant/key';

// fetch all report data by mahasiswa id
const useFetchReportByMahasiswa = () => {
  const [loading, setLoading] = useState(false);
  const [reportIntern, setReportIntern] = useState([]);

  const { userLoggedInData } = useUserContext();

  useEffect(() => {
    const token = localStorage.getItem(TOKEN);
    const controller = new AbortController();
    const signal = controller.signal;
    const getReportMahasiswa = async () => {
      setLoading(true);
      try {
        const data = await getReportByMahasiswaAPI(userLoggedInData?.id, token, signal);
        setReportIntern(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    getReportMahasiswa();
    return () => {
      controller.abort();
    };
  }, [userLoggedInData]);

  return { loading, reportIntern };
};

export default useFetchReportByMahasiswa;
