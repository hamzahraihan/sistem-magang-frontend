import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getInternshipByIdAPI } from '../../constant/api';
import { useLogbookContext, useLogbookDispatch } from '../../hooks/useLogbookContext';
import toast from 'react-hot-toast';
import { TOKEN } from '../../constant/key';

const useFetchLogbook = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useLogbookDispatch();
  const { logbook } = useLogbookContext();
  const { internship_id } = useParams();
  const token = localStorage.getItem(TOKEN);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const getInternshipLogbook = async () => {
      setLoading(true);
      try {
        const data = await getInternshipByIdAPI(internship_id, signal, token);
        dispatch({ type: 'SET_LOGBOOK_DATA', payload: data });
        setLoading(false);
      } catch (error) {
        if (error.response.status === 403) {
          toast.error('Anda tidak mempunyai hak akses. Pastikan Anda sudah login dengan akun dan role yang benar.');
        }
        console.error(error);
      }
    };
    getInternshipLogbook();
    return () => {
      controller.abort();
    };
  }, [dispatch, internship_id, token]);
  return { logbook, loading };
};

export default useFetchLogbook;
