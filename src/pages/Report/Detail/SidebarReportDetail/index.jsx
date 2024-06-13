import { Link, useParams } from 'react-router-dom';
import { ArrowIcon } from '../../../../components/Icons';
import { useReportInternContext } from '../../../../hooks/useReportInternContext';
import PrimaryButton from '../../../../components/PrimaryButton';

const SidebarReportDetail = () => {
  const { handleDeleteReport, loadingUpdate } = useReportInternContext();
  const { report_id } = useParams();
  return (
    <div className="lg:col-span-1 gap-4 col-span-3 flex flex-col top-5 lg:items-start  ">
      <Link to="/report" className="flex lg:hidden items-center justify-center rotate-180 border border-neutral-300 rounded-full h-10 w-10 hover:bg-neutral-100 transition-all bg-white">
        <ArrowIcon />
      </Link>
      <div className="flex flex-col w-full gap-8">
        <h1 className="text-xl font-bold">Laporan Akhir Magang</h1>
        <div className="flex flex-col gap-2">
          <PrimaryButton onClick={() => handleDeleteReport(report_id)} loading={loadingUpdate} text="Hapus laporan" type="button" disable={loadingUpdate} />
          <Link to={`/report/update/${report_id}`} className="border border-gray-300 hover:bg-gray-200 active:bg-gray-300 bg-white font-bold rounded-xl text-center p-3 duration-150">
            Ubah laporan
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SidebarReportDetail;
