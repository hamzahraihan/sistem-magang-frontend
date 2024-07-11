import { Link } from 'react-router-dom';
import { ArrowIcon } from '../../../components/Icons';
import InternshipNotFound from '../InternshipNotFound';
import SidebarDetailInternship from './SidebarDetailInternship';

import useFetchInternshipById from '../../../features/internship/useFetchInternshipById';

import DetailCard from './DetailCard';

const DetailInternship = () => {
  const { internshipByID } = useFetchInternshipById();

  return (
    <div className="grid grid-cols-3 gap-5">
      <div className="flex flex-col gap-4 lg:col-span-2 col-span-3">
        <div className="flex justify-between">
          <Link to="/kegiatan-magang" className="flex items-center justify-center rotate-180 border border-neutral-300 rounded-full h-10 w-10 hover:bg-neutral-100 transition-all bg-white" onClick={window.scrollTo(0, 0)}>
            <ArrowIcon />
          </Link>
          {internshipByID.status === 'Tidak disetujui' && (
            <Link to={`/kegiatan-magang/update/${internshipByID.internship_id}`} className="h-fit font-bold p-3 bg-white hover:bg-gray-50 active:bg-gray-100 duration-150 border border-gray-300 rounded-xl w-fit cursor-pointer">
              Ubah berkas
            </Link>
          )}
        </div>
        {!internshipByID ? <InternshipNotFound /> : <DetailCard />}
      </div>
      <SidebarDetailInternship />
    </div>
  );
};

export default DetailInternship;
