import { useEffect, useMemo, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { getInternshipByIdAPI } from '../../constant/api';
import { TOKEN } from '../../constant/key';
import toast from 'react-hot-toast';
import { useInternshipContext, useInternshipDispatch } from '../../hooks/useInternshipContext';

// fetch internship detail data by internship id
const useFetchInternshipById = () => {
  const [loading, setLoading] = useState(false);
  const { internship: internshipByID } = useInternshipContext();
  console.log('🚀 ~ useFetchInternshipById ~ internshipByID:', internshipByID);
  const dispatch = useInternshipDispatch();
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
        dispatch({ type: 'SET_INTERNSHIP_DATA', payload: data });
        setLoading(false);
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
  }, [dispatch, internID]);
  return { internshipByID, loading };
};

export default useFetchInternshipById;
