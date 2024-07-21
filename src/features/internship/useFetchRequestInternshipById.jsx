import { useEffect, useState } from 'react';
import { getRequestInternshipByIdAPI } from '../../constant/api';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { TOKEN } from '../../constant/key';

const useFetchRequestInternshipById = () => {
  const [loading, setLoading] = useState(false);
  const [requestInternship, setRequestInternship] = useState([]);

  const { letter_id } = useParams();

  useEffect(() => {
    const getLetterById = async () => {
      const token = localStorage.getItem(TOKEN);
      setLoading(true);
      try {
        const data = await getRequestInternshipByIdAPI(letter_id, token);
        setRequestInternship(data);
        setLoading(false);
      } catch (error) {
        if (error.response.status === 403) {
          toast.error('Anda tidak mempunyai hak akses. Pastikan Anda sudah login dengan akun dan role yang benar.');
        }

        setLoading(false);
      }
    };
    getLetterById();
  }, [letter_id]);

  return { requestInternship, loading };
};

export default useFetchRequestInternshipById;
