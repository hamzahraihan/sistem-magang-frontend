import { useEffect, useState } from 'react';
import { getRequestInternshipAPI } from '../../constant/api';
import toast from 'react-hot-toast';
import { useUserContext } from '../../hooks/useUserContext';

const useFetchRequestInternship = () => {
  const [loading, setLoading] = useState(false);
  const [requestInternship, setRequestInternship] = useState([]);

  const { userLoggedInData } = useUserContext();

  useEffect(() => {
    const getAllLetterInternship = async () => {
      setLoading(true);
      try {
        const data = await getRequestInternshipAPI();
        setRequestInternship(data);
        setLoading(false);
      } catch (error) {
        if (error.response.status === 403) {
          toast.error('Anda tidak mempunyai hak akses. Pastikan Anda sudah login dengan akun dan role yang benar.');
        }

        setLoading(false);
      }
    };
    getAllLetterInternship();
  }, [userLoggedInData]);

  return { requestInternship, loading };
};

export default useFetchRequestInternship;
