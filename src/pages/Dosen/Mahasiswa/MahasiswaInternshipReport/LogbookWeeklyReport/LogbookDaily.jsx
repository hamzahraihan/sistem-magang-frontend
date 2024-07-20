import PropTypes from 'prop-types';
import { weekDay } from '../../../../../utils/formatDate';

const LogbookDaily = ({ logbook }) => {
  return (
    <div key={logbook.date_intern} className="flex flex-col justify-center border border-neutral-300 rounded-2xl bg-white">
      <div className="flex border-b items-center gap-2 border-neutral-200 rounded-tl-[32px] rounded-tr-[32px] p-4 font-bold">
        <div className={`h-10 w-10 rounded-full ${logbook.isComplete && 'bg-hoverColor border-none'} border border-neutral-200`}></div>
        <div className="flex flex-col">
          <p>{weekDay(logbook.date_intern)}</p>
        </div>
      </div>
      <div className="flex p-4">
        {logbook.isComplete ? (
          <div className="flex flex-col gap-2">
            <p className="text-gray-500 text-sm">Hasil kerja mahasiswa hari ini:</p>
            <p className="text-start">{logbook.log_description}</p>
          </div>
        ) : (
          <div className="flex m-auto">
            <p>Mahasiswa belum mengisi logbook ini</p>
          </div>
        )}
      </div>
    </div>
  );
};

LogbookDaily.propTypes = {
  logbook: PropTypes.any,
};

export default LogbookDaily;
