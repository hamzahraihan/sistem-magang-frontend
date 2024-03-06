import { Link } from 'react-router-dom';
import { ArrowIcon } from '../../components/Icons';
import SidebarProfile from './SidebarProfile';
import CardPost from '../../components/CardPost';

const Profile = () => {
  return (
    <div className="col-span-3 pb-10">
      <div className="grid grid-cols-3 gap-5 ">
        <div className="lg:order-first flex flex-col gap-4 lg:col-span-2 col-span-3 order-last">
          <Link to="/" className="flex items-center justify-center rotate-180 border border-neutral-300 rounded-full h-10 w-10 hover:bg-neutral-100 transition-all">
            <ArrowIcon />
          </Link>
          <h1 className="text-xl font-bold">Profile</h1>
          <div className="flex flex-col gap-2 justify-center items-center m-auto">
            <div className="border border-neutral-400 h-52 w-52  bg-slate-500 animate-pulse rounded-full"></div>
            <p className="font-bold text-base rounded-xl bg-activeColor py-2 px-4 w-fit">Hamzah Raihan</p>
            <p className="text-neutral-400">hamzahraihan@gmail.com</p>
          </div>
          <p className="text-xl font-bold">Post Terbaru</p>
          <CardPost />
        </div>
        <SidebarProfile />
      </div>
    </div>
  );
};

export default Profile;
