import { useEffect, useMemo, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { getInternshipByIdAPI } from '../../constant/api';
import { TOKEN } from '../../constant/key';
import toast from 'react-hot-toast';

// fetch internship detail data by internship id
const useFetchInternshipById = () => {
  const [loading, setLoading] = useState(false);
  const [internshipByID, setInternshipByID] = useState([]);
  const { internship_id } = useParams();

  const { state } = useLocation();

  const internID = useMemo(() => {
    return state ? state.internshipID : internship_id;
  }, [state, internship_id]);

  useEffect(() => {
    const token = localStorage.getItem(TOKEN);
    const controller = new AbortController();
    const signal = controller.signal;
    const getInternshipById = async () => {
      setLoading(true);
      try {
        const data = await getInternshipByIdAPI(internID, signal, token);
        setInternshipByID(data);
        setLoading(false);
      } catch (error) {
        if (error.response.status === 403) {
          toast.error('Anda tidak mempunyai hak akses. Pastikan Anda sudah login dengan akun dan role yang benar.');
        }

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
