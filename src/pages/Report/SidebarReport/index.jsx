import { Link } from 'react-router-dom';
import { ArrowIcon } from '../../../components/Icons';
import PrimaryButton from '../../../components/PrimaryButton';

const SidebarReport = () => {
  return (
    <div className="lg:col-span-1 gap-4 col-span-3 flex flex-col top-5 lg:items-start  ">
      <Link to="/" className="flex lg:hidden items-center justify-center rotate-180 border border-neutral-300 rounded-full h-10 w-10 hover:bg-neutral-100 transition-all bg-white">
        <ArrowIcon />
      </Link>
      <div className="flex flex-col gap-2">
        <h1 className="font-bold text-xl">Laporan Akhir</h1>
        <div>
          <p>File laporan yang wajib harus kamu kirim</p>
          <ul className="list-disc list-inside">
            <li>File surat selesai magang</li>
            <li>File laporan akhir magang</li>
            <li>File penilaian dari perusahaan</li>
          </ul>
        </div>
        <p>Isi form laporan akhir setelah seluruh logbook disetujui oleh dosen pembimbing</p>
      </div>
      <div className="lg:block w-full ">
        <PrimaryButton text="Buat Laporan Magang" />
      </div>
    </div>
  );
};

export default SidebarReport;
