import { Link, useLocation } from 'react-router-dom';
import { ArrowIcon } from '../../components/Icons';
import SidebarLogbookDetail from './SidebarLogbookDetail';
import LogbookWeek from './LogbookWeek';

const LogbookDetail = () => {
  const { state } = useLocation();
  console.log('🚀 ~ LogbookDetail ~ state:', state);

  return (
    <div className="col-span-3 pb-10">
      <div className="grid grid-cols-3 gap-5">
        <div className="flex flex-col gap-4 lg:col-span-2 col-span-3">
          <Link to="/logbook" className="flex items-center justify-center rotate-180 border border-neutral-300 rounded-full h-10 w-10 hover:bg-neutral-100 transition-all">
            <ArrowIcon />
          </Link>
          <LogbookWeek state={state} />
        </div>
        <SidebarLogbookDetail />
      </div>
    </div>
  );
};

export default LogbookDetail;
