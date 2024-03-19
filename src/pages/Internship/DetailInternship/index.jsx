import { Link } from 'react-router-dom';
import { ArrowIcon, Spinner } from '../../../components/Icons';
import { useInternshipContext } from '../../../hooks/useInternshipContext';
import InternshipNotFound from '../InternshipNotFound';
import SidebarDetailInternship from './SidebarDetailInternship';
import { formatDate } from '../../../utils/formatDate';
import { capitalizeFirstLetter } from '../../../utils/capitalizeFirstLetter';

const DetailInternship = () => {
  const { loadingDetail, internshipByID } = useInternshipContext();
  console.log('🚀 ~ DetailInternship ~ internshipByID:', internshipByID);

  return (
    <div className="grid grid-cols-3 gap-5">
      <div className="flex flex-col gap-4 lg:col-span-2 col-span-3">
        <Link to="/kegiatan-magang" className="flex items-center justify-center rotate-180 border border-neutral-300 rounded-full h-10 w-10 hover:bg-neutral-100 transition-all">
          <ArrowIcon />
        </Link>
        {loadingDetail ? (
          <Spinner />
        ) : !internshipByID ? (
          <InternshipNotFound />
        ) : (
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <h1 className="font-bold text-2xl">{capitalizeFirstLetter(internshipByID.instance)}</h1>
              <div className="flex flex-col gap-1">
                <p className="text-gray-400">Periode magang</p>
                <p className="font-bold">
                  {formatDate(internshipByID.start_intern)} - {formatDate(internshipByID.end_intern)}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-gray-400">Lokasi</p>
                <p className="font-bold">{internshipByID.location}</p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-gray-400">Deskripsi Perusahaan</p>
                <p className="font-bold">{internshipByID.description}</p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-gray-400">Tipe Magang</p>
                <p className="font-bold">{internshipByID.type}</p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="font-bold text-sm">Dokumen Persyaratan Magang</h1>
              <div className="flex flex-col gap-1">
                <h1 className="text-sm">Surat bersedia dosen magang</h1>
                <iframe className="w-full h-96 rounded-xl" src={`https://drive.google.com/file/d/${internshipByID.lecture_agreement}/preview`} title="doc-1"></iframe>
              </div>
              <div className="flex flex-col gap-1">
                <h1 className="text-sm">Surat magang dari kampus</h1>
                <iframe className="w-full h-96 rounded-xl" src={`https://drive.google.com/file/d/${internshipByID.campus_approval}/preview`} title="doc-1"></iframe>
              </div>
              <div className="flex flex-col gap-1">
                <h1 className="text-sm">Surat magang dari perusahaan</h1>
                <iframe className="w-full h-96 rounded-xl" src={`https://drive.google.com/file/d/${internshipByID.intern_agreement}/preview`} title="doc-1"></iframe>
              </div>
            </div>
          </div>
        )}
      </div>
      <SidebarDetailInternship />
    </div>
  );
};

export default DetailInternship;
