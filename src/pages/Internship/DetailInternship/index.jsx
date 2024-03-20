import { Link } from 'react-router-dom';
import { ArrowIcon, Spinner } from '../../../components/Icons';
import { useInternshipContext } from '../../../hooks/useInternshipContext';
import InternshipNotFound from '../InternshipNotFound';
import SidebarDetailInternship from './SidebarDetailInternship';
import { formatDate } from '../../../utils/formatDate';
import { capitalizeFirstLetter } from '../../../utils/capitalizeFirstLetter';
import InternshipDocs from './InternshipDocs';

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
              <div className="flex flex-col gap-1 text-sm">
                <p className="text-gray-400">Periode magang</p>
                <p className="font-bold">
                  {formatDate(internshipByID.start_intern)} - {formatDate(internshipByID.end_intern)}
                </p>
              </div>
              <div className="flex flex-col gap-1 text-sm">
                <p className="text-gray-400">Lokasi</p>
                <p className="font-bold">{internshipByID.location}</p>
              </div>
              <div className="flex flex-col gap-1 text-sm">
                <p className="text-gray-400">Deskripsi Perusahaan</p>
                <p className="font-bold">{internshipByID.description}</p>
              </div>
              <div className="flex flex-col gap-1 text-sm">
                <p className="text-gray-400">Tipe Magang</p>
                <p className="font-bold">{internshipByID.type}</p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="font-bold text-base">Dokumen Persyaratan Magang</h1>
              <InternshipDocs text="Surat bersedia dosen magang" docsID={internshipByID.lecture_agreement} />
              <InternshipDocs text="Surat magang dari kampus" docsID={internshipByID.campus_approval} />
              <InternshipDocs text="Surat magang dari perusahaan" docsID={internshipByID.intern_agreement} />
            </div>
          </div>
        )}
      </div>
      <SidebarDetailInternship />
    </div>
  );
};

export default DetailInternship;
