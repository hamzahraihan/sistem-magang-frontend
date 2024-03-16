import PropTypes from 'prop-types';

import dayName from '../../../utils/dayName';
import monthName from '../../../utils/monthName';
import PrimaryButton from '../../../components/PrimaryButton';

const LogbookWeek = (props) => {
  const { state } = props;

  return (
    <div className="flex flex-col gap-5">
      {state.slice(0, 5).map((item, index) => (
        <div key={index} className="flex flex-col justify-center border border-neutral-300 rounded-[32px]">
          <div className="flex border-b items-center gap-2 border-neutral-200 rounded-tl-[32px] rounded-tr-[32px] p-4 font-bold">
            <div className="h-10 w-10 rounded-full bg-rose-200 border border-neutral-200"></div>
            <div className="flex flex-col">
              <p>
                {item.getDate()} {monthName[item.getMonth()]} {item.getFullYear()}
              </p>
              <p>{dayName[item.getDay()]}</p>
            </div>
          </div>
          <div className="flex m-auto p-4 w-fit">
            <PrimaryButton text={'Buat Laporan Harian'} />
          </div>
        </div>
      ))}
    </div>
  );
};

LogbookWeek.propTypes = {
  state: PropTypes.array,
};

export default LogbookWeek;
