import { Link, useParams } from 'react-router-dom';
import PrimaryButton from '../../../../components/PrimaryButton';
import { useReportInternContext } from '../../../../hooks/useReportInternContext';
import { ArrowIcon } from '../../../../components/Icons';

const SidebarUpdateReport = () => {
  const { loadingUpdate } = useReportInternContext();
  const { report_id } = useParams();
  return (
    <div className="lg:col-span-1 gap-4 col-span-3 flex flex-col top-5 lg:items-start ">
      <Link to={`/report/detail/${report_id}`} className="flex lg:hidden items-center justify-center rotate-180 border border-neutral-300 rounded-full h-10 w-10 hover:bg-neutral-100 transition-all">
        <ArrowIcon />
      </Link>
      <div className="lg:block w-full hidden">
        <PrimaryButton type="submit" text="Kirim Laporan" loading={loadingUpdate} />
      </div>
      <div className="border-t border-neutral-300 w-full lg:block hidden"></div>
      <div className="flex flex-col gap-2">
        <h1 className="font-bold text-xl">Ubah laporan akhir</h1>
        <p>Jangan lupa cek lagi file laporan kamu sebelum dikirim.</p>
        <div>
          <p>File laporan yang wajib harus kamu kirim</p>
          <ul className="list-disc list-inside">
            <li>File surat selesai magang</li>
            <li>File laporan akhir magang</li>
            <li>File penilaian dari perusahaan</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SidebarUpdateReport;
