import { Link, useParams } from 'react-router-dom';
import SidebarLogbookDetail from './SidebarLogbookDetail';
import { ArrowIcon } from '../../../components/Icons';
import LogbookWeek from './LogbookWeek';
import { useUserContext } from '../../../hooks/useUserContext';

const LogbookDetail = () => {
  const { userLoggedInData } = useUserContext();
  const { internship_id } = useParams();

  return (
    <div className="col-span-3 pb-10">
      <div className="grid grid-cols-3 gap-5">
        <div className="flex flex-col gap-4 lg:col-span-2 col-span-4">
          <Link to={`/kegiatan-magang/logbook/${userLoggedInData?.id}/${internship_id}`} className="flex items-center justify-center rotate-180 border border-neutral-300 rounded-full h-10 w-10 hover:bg-neutral-100 transition-all">
            <ArrowIcon />
          </Link>
          <LogbookWeek />
        </div>
        <SidebarLogbookDetail />
      </div>
    </div>
  );
};

export default LogbookDetail;
