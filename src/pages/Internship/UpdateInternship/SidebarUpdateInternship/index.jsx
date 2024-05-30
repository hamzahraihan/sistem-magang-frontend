import { Link, useParams } from 'react-router-dom';
import PrimaryButton from '../../../../components/PrimaryButton';
import { ArrowIcon } from '../../../../components/Icons';
import { useInternshipContext } from '../../../../hooks/useInternshipContext';

const SidebarUpdateInternship = () => {
  const { loadingUpdate } = useInternshipContext();
  const { internship_id } = useParams();
  return (
    <div className="lg:flex lg:col-span-1 col-span-3 flex-col top-5 lg:items-start lg:order-last order-first">
      <div className="flex flex-col w-full gap-5">
        <Link to={`/kegiatan-magang/detail/${internship_id}`} className="flex items-center justify-center rotate-180 border border-neutral-300 rounded-full h-10 w-10 hover:bg-neutral-100 transition-all bg-white lg:hidden">
          <ArrowIcon />
        </Link>
        <h1 className="text-xl font-bold">Pendaftaran Magang</h1>
        <p className="text-neutral-500">Semua data yang anda input akan dimasukan kedalam database agar dapat diproses untuk penilaian magang mandiri</p>
        <div className="w-full">
          <PrimaryButton type="submit" text="Ubah Laporan" loading={loadingUpdate} />
        </div>
      </div>
    </div>
  );
};

export default SidebarUpdateInternship;
