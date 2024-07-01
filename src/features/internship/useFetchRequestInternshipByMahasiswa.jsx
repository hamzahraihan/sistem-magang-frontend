import { useEffect, useState } from 'react';
import { TOKEN } from '../../constant/key';
import { getRequestInternshipByMahasiswaAPI } from '../../constant/api';
import toast from 'react-hot-toast';
import { useUserContext } from '../../hooks/useUserContext';

const useFetchRequestInternshipByMahasiswa = () => {
  const [loading, setLoading] = useState(false);
  const [requestInternship, setRequestInternship] = useState([]);

  const { userLoggedInData } = useUserContext();

  useEffect(() => {
    const token = localStorage.getItem(TOKEN);
    const getLetterByMahasiswa = async () => {
      setLoading(true);
      try {
        const data = await getRequestInternshipByMahasiswaAPI(userLoggedInData?.id, token);
        setRequestInternship(data);
        setLoading(false);
      } catch (error) {
        if (error.response.status === 403) {
          toast.error('Anda tidak mempunyai hak akses. Pastikan Anda sudah login dengan akun dan role yang benar.');
        }
        console.error(error);
        setLoading(false);
      }
    };
    getLetterByMahasiswa();
  }, [userLoggedInData]);

  return { requestInternship, loading };
};

export default useFetchRequestInternshipByMahasiswa;
