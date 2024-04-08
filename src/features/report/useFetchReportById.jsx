import { useEffect, useState } from 'react';
import { getReportByIdAPI } from '../../constant/api';
import { useReportInternDispatch } from '../../hooks/useReportInternContext';
import { TOKEN } from '../../constant/key';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

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
        if (error.response.status === 403) {
          toast.error('Anda tidak mempunyai hak akses. Pastikan Anda sudah login dengan akun dan role yang benar.');
        }
        console.error(error);
        setLoading(false);
      }
    };
    getReportInternship();
  }, [dispatch, report_id]);

  return { loading, reportDetail };
};

export default useFetchReportById;
