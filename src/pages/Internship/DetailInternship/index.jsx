import { Link, useLocation } from 'react-router-dom';
import { ArrowIcon } from '../../../components/Icons';
import { useInternshipContext } from '../../../hooks/useInternshipContext';
import InternshipPlaceholder from '../../../components/Placeholder/InternshipPlaceholder';
import InternshipNotFound from '../InternshipNotFound';
import SidebarDetailInternship from './SidebarDetailInternship';
import { formatDate } from '../../../utils/formatDate';

const DetailInternship = () => {
  const { loadingDetail, internshipByID } = useInternshipContext();
  const { state } = useLocation();
  console.log('🚀 ~ DetailInternship ~ internshipID:', state);

  return (
    <div className="grid grid-cols-3 gap-5">
      <div className="flex flex-col gap-4 lg:col-span-2 col-span-3">
        <Link to="/kegiatan-magang" className="flex items-center justify-center rotate-180 border border-neutral-300 rounded-full h-10 w-10 hover:bg-neutral-100 transition-all">
          <ArrowIcon />
        </Link>
        {loadingDetail ? <InternshipPlaceholder /> : !internshipByID ? <InternshipNotFound /> : <div>{internshipByID.instance}</div>}
      </div>
      <SidebarDetailInternship />
    </div>
  );
};

export default DetailInternship;
