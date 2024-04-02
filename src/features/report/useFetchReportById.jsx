import { useEffect, useState } from 'react';
import { getReportByIdAPI } from '../../constant/api';
import { useReportInternDispatch } from '../../hooks/useReportInternContext';
import { TOKEN } from '../../constant/key';
import { useParams } from 'react-router-dom';

const useFetchReportById = () => {
  const [loading, setLoading] = useState(false);
  const [reportDetail, setReportDetail] = useState({});
  const { report_id } = useParams();
  const dispatch = useReportInternDispatch();

  useEffect(() => {
    const getReportInternship = async () => {
      setLoading(true);
      const token = localStorage.getItem(TOKEN);
      try {
        const data = await getReportByIdAPI(report_id, token);
        setReportDetail(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    getReportInternship();
  }, [dispatch, report_id]);

  return { loading, reportDetail };
};

export default useFetchReportById;
