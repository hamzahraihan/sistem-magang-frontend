import { useEffect, useMemo, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { getInternshipByIdAPI } from '../../constant/api';
import { TOKEN } from '../../constant/key';

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
