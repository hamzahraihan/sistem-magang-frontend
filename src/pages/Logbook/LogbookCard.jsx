import { ArrowIcon } from '../../components/Icons';
import PropTypes from 'prop-types';
import monthName from '../../utils/monthName';
import dayName from '../../utils/dayName';
import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/formatDate';

const LogbookCard = (props) => {
  const { index, weekLog } = props;

  return (
    <Link to={`/logbook/${formatDate(weekLog[0])}`} state={weekLog} className="border border-neutral-200 rounded-[32px] lg:p-9 md:p-4 sm:p-4 p-4">
      <div className="flex justify-between items-center gap-2">
        <div>
          <div className="flex items-center xm:text-base text-md font-bold gap-1">
            <p>
              {weekLog[0].getDate()} {monthName[weekLog[0].getMonth()].slice(0, 3)} {weekLog[0].getFullYear()}
            </p>
            <p>
              {weekLog[4] && '-'} {weekLog[4]?.getDate()} {weekLog[4] && monthName[weekLog[4].getMonth()].slice(0, 3)} {weekLog[4]?.getFullYear()}
            </p>
            <ArrowIcon />
          </div>
          <p className="text-xs text-neutral-400">Minggu {index + 1}</p>
        </div>

        <div className="lg:flex md:flex sm:flex gap-3 min-[490px]:flex hidden">
          {dayName.slice(1, 6).map((item, index) => (
            <div key={index} className="flex justify-center items-center h-10 w-10 border border-neutral-200 rounded-full">
              <p>{dayName[weekLog[index].getDay()][0]}</p>
            </div>
          ))}
        </div>
      </div>
    </Link>
  );
};

LogbookCard.propTypes = {
  index: PropTypes.number,
  weekLog: PropTypes.array,
};

export default LogbookCard;
