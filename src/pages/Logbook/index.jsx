import { Link, useParams } from 'react-router-dom';
import { ArrowIcon, Spinner } from '../../components/Icons';
import SidebarLogbook from './SidebarLogbook';

import { formatDate } from '../../utils/formatDate';
import LogbookCard from './LogbookCard';
import useFetchLogbook from '../../features/logbook/useFetchLogbook';
import useFetchWeeklyLogbook from '../../features/logbook/useFetchWeeklyLogbook';

const Logbook = () => {
  const { weeks, loading } = useFetchWeeklyLogbook();
  const { loading: loadingDate, logbook } = useFetchLogbook();
  const { internship_id } = useParams();

  return (
    <div className="col-span-3 pb-10">
      <div className="grid grid-cols-3 gap-5">
        <div className="flex flex-col gap-4 lg:col-span-2 col-span-3">
          <Link to={`/kegiatan-magang/detail/${internship_id}`} className="flex items-center justify-center rotate-180 border border-neutral-300 rounded-full h-10 w-10 hover:bg-neutral-100 transition-all">
            <ArrowIcon />
          </Link>
          <p className="text-base font-bold">
            {loadingDate ? (
              <>Periode magang:</>
            ) : (
              <>
                Periode magang: {formatDate(logbook.start_intern)} - {formatDate(logbook.end_intern)}
              </>
            )}
          </p>
          {loading ? <Spinner /> : weeks.map((week) => <LogbookCard key={week.week} week={week} />)}
        </div>
        <SidebarLogbook />
      </div>
    </div>
  );
};

export default Logbook;
