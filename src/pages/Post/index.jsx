import { Link } from 'react-router-dom';
import { ArrowIcon } from '../../components/Icons';
import Description from './Description';
import CommentSection from './CommentSection';
import SidebarPost from './SidebarPost';

const DetailPost = () => {
  return (
    <div className="col-span-3">
      <div className="grid grid-cols-3 gap-5">
        <div className="flex flex-col gap-4 lg:col-span-2 col-span-3">
          <Link to="/" className="flex items-center justify-center rotate-180 border border-neutral-300 rounded-full h-10 w-10 hover:bg-neutral-100 transition-all">
            <ArrowIcon />
          </Link>
          <div className="bg-slate-300 animate-pulse h-96 rounded-[32px] "></div>
          <Description />
          <CommentSection />
        </div>
        <SidebarPost />
      </div>
    </div>
  );
};

export default DetailPost;
