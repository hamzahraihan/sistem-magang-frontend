import { ArrowIcon } from '../../components/Icons';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import { formatDate, weekDay } from '../../utils/formatDate';
import { useUserContext } from '../../hooks/useUserContext';

const LogbookCard = ({ week }) => {
  const { Logdailies } = week;
  const { userLoggedInData } = useUserContext();
  const { id } = useParams();

  return (
    <Link to={`/kegiatan-magang/logbook/aktivitas/${userLoggedInData.id}/${week.logbook_id}`} state={{ id: id }} className="border border-neutral-200 rounded-[32px] lg:p-9 md:p-4 sm:p-4 p-4">
      <div className="flex justify-between items-center gap-2">
        <div>
          <div className="flex items-center xm:text-base text-md font-bold gap-1">
            <p>
              {formatDate(new Date(week.Logdailies[6].date_intern))} - {formatDate(week.Logdailies[2].date_intern)}
            </p>
            <ArrowIcon />
          </div>
          <p className="text-xs text-neutral-400">Minggu ke-{week.week + 1}</p>
        </div>

        <div className="lg:flex md:flex sm:flex gap-3 min-[490px]:flex hidden">
          {Logdailies.slice(2, 7)
            .reverse()
            .map((item) => (
              <div key={item.logday_id} className={`flex justify-center items-center h-10 w-10 border border-neutral-200 ${item.isComplete && 'bg-hoverColor border-none text-white'} rounded-full`}>
                <p>{weekDay(item.date_intern)[0]}</p>
              </div>
            ))}
        </div>
      </div>
    </Link>
  );
};

LogbookCard.propTypes = {
  week: PropTypes.object,
};

export default LogbookCard;
