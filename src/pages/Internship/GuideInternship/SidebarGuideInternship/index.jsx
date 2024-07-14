import { Link } from 'react-router-dom';
import { ArrowIcon } from '../../../../components/Icons';

const SidebarGuideInternship = () => {
  return (
    <div className="lg:flex lg:col-span-1 col-span-3 flex-col top-5 lg:order-last order-first">
      <Link to="/" className="flex items-center justify-center rotate-180 border border-neutral-300 rounded-full h-10 w-10 hover:bg-neutral-100 transition-all bg-white lg:hidden mb-2">
        <ArrowIcon />
      </Link>
      <div className="flex flex-col w-full gap-5">
        <h1 className="text-xl font-bold">Panduan Magang</h1>
        <p className="text-neutral-500">
          Pelaksanaan Magang diwujudkan dalam bentuk praktik kerja fulltime atau parttime pada unit tujuan magang dengan status mahasiswa aktif Universitas Singaperbangsa Karawang dengan batasan waktu minimal 1 bulan dan maksimal 6 bulan.
        </p>
        <Link
          to="https://docs.google.com/presentation/d/1to4WHd0bn7_Q1ik_WvvJTYefgRxZB1lX/edit#slide=id.p10"
          target="_blank"
          rel="noreferrer noopener"
          className="p-4 font-bold bg-primaryColor hover:bg-hoverColor active:bg-activeColor duration-150 text-white rounded-lg"
        >
          Panduan lengkap
        </Link>
      </div>
    </div>
  );
};

export default SidebarGuideInternship;
