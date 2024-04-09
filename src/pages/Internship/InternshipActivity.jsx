import { ArrowIcon } from '../../components/Icons';
import useFetchInternship from '../../features/internship/useFetchInternship';
import InternshipNotFound from './InternshipNotFound';
import SidebarInternship from './SidebarInternship';
import { Link } from 'react-router-dom';
import InternshipList from './InternshipList';

const InternshipActivity = () => {
  const { internship } = useFetchInternship();
  return (
    <div className="grid grid-cols-3 gap-5">
      <div className="flex flex-col gap-4 lg:col-span-2 col-span-3">
        <Link to="/" className="lg:flex hidden items-center justify-center rotate-180 border border-neutral-300 rounded-full h-10 w-10 hover:bg-neutral-100 transition-all bg-white">
          <ArrowIcon />
        </Link>
        {internship.length == 0 ? <InternshipNotFound /> : <InternshipList />}
      </div>
      <SidebarInternship />
    </div>
  );
};

export default InternshipActivity;
