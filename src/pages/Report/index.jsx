import { Link } from 'react-router-dom';
import { ArrowIcon } from '../../components/Icons';
import SidebarReport from './SidebarReport';
import ReportList from './ReportList';
import ReportNotFound from './ReportNotFound';
import useFetchReportByMahasiswa from '../../features/report/useFetchReportByMahasiswa';

const UploadIntern = () => {
  const { reportIntern } = useFetchReportByMahasiswa();

  return (
    <div className="col-span-3 pb-10">
      <div className="grid grid-cols-3 gap-5">
        <div className="lg:order-first flex flex-col gap-4 lg:col-span-2 col-span-3 order-last">
          <Link to="/" className="flex items-center justify-center rotate-180 border border-neutral-300 rounded-full h-10 w-10 hover:bg-neutral-100 transition-all">
            <ArrowIcon />
          </Link>
          <h1 className="text-xl font-bold">Laporan Akhir Magang</h1>
          {reportIntern.length == 0 ? <ReportNotFound /> : <ReportList />}
        </div>
        <SidebarReport />
      </div>
    </div>
  );
};

export default UploadIntern;
