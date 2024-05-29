import { Link } from 'react-router-dom';
import { ArrowIcon } from '../../../components/Icons';
import { useInternshipContext } from '../../../hooks/useInternshipContext';
import FormUpdateInternship from './FormUpdateInternship';
import SidebarUpdateInternship from './SidebarUpdateInternship';

const UpdateInternship = () => {
  const { handleCreateInternship } = useInternshipContext();
  return (
    <form className="grid grid-cols-3 gap-5" onSubmit={handleCreateInternship}>
      <div className="flex flex-col gap-4 lg:col-span-2 col-span-3">
        <div className="flex flex-col gap-2 text-base ">
          <Link to="/kegiatan-magang" className="flex items-center justify-center rotate-180 border border-neutral-300 rounded-full h-10 w-10 hover:bg-neutral-100 transition-all bg-white">
            <ArrowIcon />
          </Link>
          <FormUpdateInternship />
        </div>
      </div>
      <SidebarUpdateInternship />
    </form>
  );
};

export default UpdateInternship;
