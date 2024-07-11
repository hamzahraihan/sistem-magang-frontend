import { Link } from 'react-router-dom';
import { ArrowIcon } from '../../../components/Icons';
import SidebarGuideInternship from './SidebarGuideInternship';
import PanduanSVG from '../../../assets/svg/panduan.svg';

const GuideInternhsip = () => {
  return (
    <div className="col-span-3 pb-10">
      <div className="grid grid-cols-3 gap-5 min-w-full ">
        <div className="flex flex-col gap-4 lg:col-span-2 col-span-3">
          <Link to="/" className="flex items-center justify-center rotate-180 border border-neutral-300 rounded-full h-10 w-10 hover:bg-neutral-100 transition-all bg-white">
            <ArrowIcon />
          </Link>
          <h1 className="font-bold text-xl">Panduan Magang</h1>

          <img src={PanduanSVG} alt="panduan" />
        </div>
        <SidebarGuideInternship />
      </div>
    </div>
  );
};

export default GuideInternhsip;
