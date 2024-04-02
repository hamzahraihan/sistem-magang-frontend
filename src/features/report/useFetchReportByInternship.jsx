import { useEffect, useState } from 'react';
import { getReportByInternshipIdAPI } from '../../constant/api';
import { useReportInternContext, useReportInternDispatch } from '../../hooks/useReportInternContext';
import { TOKEN } from '../../constant/key';
import { useParams } from 'react-router-dom';

const useFetchReportByInternship = () => {
  const [loading, setLoading] = useState(false);
  const { reportIntern } = useReportInternContext();
  const { internship_id } = useParams();
  const dispatch = useReportInternDispatch();

  useEffect(() => {
    const getReportInternship = async () => {
      setLoading(true);
      const token = localStorage.getItem(TOKEN);
      try {
        const data = await getReportByInternshipIdAPI(internship_id, token);
        dispatch({ type: 'SET_REPORT_DATA', payload: data });
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    getReportInternship();
  }, [dispatch, internship_id]);
  return { loading, reportIntern };
};

export default useFetchReportByInternship;
