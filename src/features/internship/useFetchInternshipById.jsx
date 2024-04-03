import { useEffect, useMemo, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { getInternshipByIdAPI } from '../../constant/api';
import { TOKEN } from '../../constant/key';
import toast from 'react-hot-toast';

const useFetchInternshipById = () => {
  const [internshipByID, setInternshipByID] = useState([]);
  const [loading, setLoading] = useState(false);

  const { id } = useParams();
  const { state } = useLocation();

  const internID = useMemo(() => {
    return state ? state.internshipID : id;
  }, [state, id]);

  useEffect(() => {
    const token = localStorage.getItem(TOKEN);
    const controller = new AbortController();
    const signal = controller.signal;
    const getInternshipById = async () => {
      setLoading(true);
      try {
        const data = await getInternshipByIdAPI(internID, signal, token);
        setLoading(false);
        setInternshipByID(data);
      } catch (error) {
        if (error.response.status === 403) {
          toast.error('Anda tidak mempunyai hak akses. Pastikan Anda sudah login dengan akun dan role yang benar.');
        }
        console.error(error);
        setLoading(false);
      }
    };
    getInternshipById();
    return () => {
      controller.abort();
    };
  }, [internID]);
  return { internshipByID, loading };
};

export default useFetchInternshipById;
