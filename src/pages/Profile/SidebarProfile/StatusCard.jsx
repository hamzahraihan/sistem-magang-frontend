import _ from 'lodash';
import { ClockIcon, LecturerIcon, OfficeBuilding } from '../../../components/Icons';
import PropTypes from 'prop-types';

const StatusCard = ({ type, title, status }) => {
  let icon;
  let color;
  switch (type) {
    case 'angkatan':
      icon = <LecturerIcon />;
      color = 'bg-lime-300';
      break;
    case 'status':
      icon = <ClockIcon />;
      color = 'bg-amber-200';
      break;
    case 'instance':
      icon = <OfficeBuilding />;
      color = 'bg-rose-300';
      break;
  }
  return (
    <div className="flex gap-2 items-center border border-neutral-300 rounded-3xl w-full p-4 bg-white">
      <div className={`flex justify-center items-center rounded-full ${color} h-12 w-12`}>{icon}</div>
      <div className="flex flex-col">
        <h1 className="lg:text-base text-sm">{title}</h1>
        <p className="text-xs text-neutral-400">{_.capitalize(status)}</p>
      </div>
    </div>
  );
};

StatusCard.propTypes = {
  type: PropTypes.string,
  title: PropTypes.string,
  status: PropTypes.string,
};

export default StatusCard;
