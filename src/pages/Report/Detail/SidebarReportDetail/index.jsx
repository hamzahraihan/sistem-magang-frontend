import { Link } from 'react-router-dom';
import { ArrowIcon } from '../../../../components/Icons';
import useFetchReportById from '../../../../features/report/useFetchReportById';

const SidebarReportDetail = () => {
  const { reportIntern } = useFetchReportById();
  return (
    <div className="lg:col-span-1 gap-4 col-span-3 flex flex-col top-5 lg:items-start  ">
      <Link to="/report" className="flex lg:hidden items-center justify-center rotate-180 border border-neutral-300 rounded-full h-10 w-10 hover:bg-neutral-100 transition-all bg-white">
        <ArrowIcon />
      </Link>
      <div className="flex flex-col w-full gap-8">
        <h1 className="text-xl font-bold">Laporan Akhir Magang</h1>
        <div className="flex flex-col gap-2">
          <button type="button" className="bg-primaryColor text-white font-bold rounded-xl p-3 hover:bg-hoverColor active:bg-activeColor duration-150">
            Hapus laporan
          </button>
          <Link to={`/report/update/${reportIntern.report_id}`} className="border border-gray-300 hover:bg-gray-200 active:bg-gray-300 bg-white font-bold rounded-xl text-center p-3 duration-150">
            Ubah laporan
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SidebarReportDetail;
