import { Link, useLocation } from 'react-router-dom';
import { ArrowIcon } from '../../components/Icons';
import SidebarLogbookDetail from './SidebarLogbookDetail';
import LogbookWeek from './LogbookWeek';
import { formatDate } from '../../utils/formatDate';

const LogbookDetail = () => {
  const { state } = useLocation();
  console.log('🚀 ~ LogbookDetail ~ state:', formatDate(state[0]));

  return (
    <div className="col-span-3 pb-10">
      <div className="grid grid-cols-4 gap-5">
        <div className="flex flex-col gap-4 lg:col-span-2 col-span-4">
          <Link to="/logbook" className="flex items-center justify-center rotate-180 border border-neutral-300 rounded-full h-10 w-10 hover:bg-neutral-100 transition-all">
            <ArrowIcon />
          </Link>
          <LogbookWeek state={state} />
        </div>
        <SidebarLogbookDetail state={state} />
      </div>
    </div>
  );
};

export default LogbookDetail;
