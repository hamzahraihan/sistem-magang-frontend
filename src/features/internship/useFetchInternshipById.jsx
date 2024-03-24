import { useEffect, useMemo, useState } from 'react';
import { getInternshipUser } from '../../constant/api';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';

const useFetchInternshipById = () => {
  const [internshipByID, setInternshipByID] = useState([]);
  const [loading, setLoading] = useState(false);

  const { id } = useParams();
  const { state } = useLocation();

  const internID = useMemo(() => {
    return state ? state.internshipID : id;
  }, [state, id]);
  console.log('🚀 ~ internID ~ internID:', internID);

  useEffect(() => {
    const getInternshipById = async () => {
      const cancelToken = axios.CancelToken.source();
      console.log('🚀 ~ getInternshipById ~ cancelToken:', cancelToken);
      setLoading(true);
      try {
        const data = await getInternshipUser(internID);
        setInternshipByID(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
      return () => {
        cancelToken.cancel();
      };
    };
    getInternshipById();
  }, [internID]);
  return { internshipByID, loading };
};

export default useFetchInternshipById;
