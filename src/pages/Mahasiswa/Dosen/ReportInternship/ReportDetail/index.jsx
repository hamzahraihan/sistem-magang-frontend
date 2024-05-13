import { Link } from 'react-router-dom';
import { ArrowIcon } from '../../../../../components/Icons';
import useFetchReportById from '../../../../../features/report/useFetchReportById';

const ReportDetail = () => {
  const { reportDetail } = useFetchReportById();
  console.log('🚀 ~ ReportDetail ~ reportDetail:', reportDetail);
  return (
    <div className="col-span-3 pb-10">
      <div className="flex flex-col lg:col-span-2 col-span-3">
        <Link to="/dashboard/mahasiswa/laporan-akhir" className="flex items-center justify-center rotate-180 border border-neutral-300 rounded-full h-10 w-10 hover:bg-neutral-100 transition-all bg-white mb-2">
          <ArrowIcon />
        </Link>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex flex-col mb-2">
            <h1 className="text-xl font-bold">Detail Laporan Akhir</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportDetail;
