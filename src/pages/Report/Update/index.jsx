import { Link, useParams } from 'react-router-dom';
import { ArrowIcon } from '../../../components/Icons';
import SidebarUploadReport from '../Upload/SidebarUploadReport';

const ReportUpdateForm = () => {
  const { report_id } = useParams();
  console.log('🚀 ~ ReportUpdateForm ~ report_id:', report_id);
  return (
    <div className="col-span-3 pb-10">
      <form className="grid grid-cols-3 gap-5">
        <div className="lg:order-first flex flex-col gap-4 lg:col-span-2 col-span-3 order-last">
          <Link to={`/report/detail/${report_id}`} className="lg:flex hidden items-center justify-center rotate-180 border border-neutral-300 rounded-full h-10 w-10 hover:bg-neutral-100 transition-all bg-white">
            <ArrowIcon />
          </Link>
          <h1 className="text-xl font-bold">Ubah Berkas</h1>
        </div>
        <SidebarUploadReport />
      </form>
    </div>
  );
};

export default ReportUpdateForm;
