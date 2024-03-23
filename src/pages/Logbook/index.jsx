import { Link } from 'react-router-dom';
import { ArrowIcon } from '../../components/Icons';
import SidebarLogbook from './SidebarLogbook';

import { formatDate } from '../../utils/formatDate';
import { useLogbookContext } from '../../hooks/useLogbookContext';
import LogbookCard from './LogbookCard';

const Logbook = () => {
  const { logbook, weeks } = useLogbookContext();
  console.log('🚀 ~ Logbook ~ logbook:', logbook);

  return (
    <div className="col-span-3">
      <div className="grid grid-cols-3 gap-5">
        <div className="flex flex-col gap-4 lg:col-span-2 col-span-3">
          <Link to="/kegiatan-magang" className="flex items-center justify-center rotate-180 border border-neutral-300 rounded-full h-10 w-10 hover:bg-neutral-100 transition-all">
            <ArrowIcon />
          </Link>
          <p className="text-base font-bold">
            Periode magang: {formatDate(logbook.start_intern)} - {formatDate(logbook.end_intern)}
          </p>
          {weeks.map((weekLog, index) => (
            <LogbookCard key={index} index={index} weekLog={weekLog} />
          ))}
        </div>
        <SidebarLogbook />
      </div>
    </div>
  );
};

export default Logbook;
