import { ArrowIcon } from '../../components/Icons';
import SidebarInternship from './SidebarInternship';
import SearchSVG from '../../assets/svg/Search-bro.svg';
import { Link } from 'react-router-dom';

const InternshipActivity = () => {
  return (
    <div className="grid grid-cols-3 gap-5">
      <div className="flex flex-col gap-4 lg:col-span-2 col-span-3">
        <Link to="/" className="flex items-center justify-center rotate-180 border border-neutral-300 rounded-full h-10 w-10 hover:bg-neutral-100 transition-all">
          <ArrowIcon />
        </Link>

        <p className="text-xl font-bold">Kegiatan Magang</p>
        <div className="h-80">
          <img className="mx-auto h-96 object-fill" height="500" width="500" src={SearchSVG} alt="intern-not-found" />
        </div>
        <div className="mx-auto text-center w-80">
          <p className="text-xl font-bold">Belum ada kegiatan</p>
          <p className="text-sm ">Silahkan daftar magang jika sudah dapat persetujuan dari perusahaan</p>
        </div>
      </div>
      <SidebarInternship />;
    </div>
  );
};

export default InternshipActivity;
