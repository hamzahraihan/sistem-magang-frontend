import { Link } from 'react-router-dom';
import { ClockIcon, TagIcon } from '../../../components/Icons';

const SidebarCard = () => {
  return (
    <div className="border border-neutral-200 rounded-[32px]">
      <Link to="/detail-post">
        <div className="bg-slate-300 animate-pulse h-32 rounded-se-[32px] rounded-ss-[32px] "></div>
      </Link>
      <div className="flex flex-col gap-3 p-7">
        <div className="flex gap-2">
          <p className="flex gap-1 items-center text-neutral-700 text-xs">
            <ClockIcon />
            19 November 2023
          </p>
          <p className="flex gap-1 items-center text-neutral-700 text-xs">
            <TagIcon />
            Magang
          </p>
        </div>
        <p className="text-sm font-bold line-clamp-2">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Labore atque</p>
        <p className="text-neutral-400 underline">Hamzah</p>
      </div>
    </div>
  );
};

export default SidebarCard;
