import dayName from '../../utils/dayName';
import PropTypes from 'prop-types';
import PrimaryButton from '../../components/PrimaryButton';
import monthName from '../../utils/monthName';

const LogbookWeek = (props) => {
  const { state } = props;

  return (
    <div className="flex flex-col gap-5">
      {state.slice(0, 5).map((item, index) => (
        <div key={index} className="flex flex-col border border-neutral-300 rounded-[32px]">
          <div className="border-b border-neutral-300 rounded-tl-[32px] rounded-tr-[32px] bg-activeColor p-4 font-bold">
            <p>
              {item.getDate()} {monthName[item.getMonth()]} {item.getFullYear()}
            </p>
            <div className="flex items-center justify-center h-10 w-10">{dayName[item.getDay()]}</div>
          </div>
          <div className="border-neutral-300 border-t"></div>
          <div className="flex m-auto p-4 w-fit font-bold">
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
