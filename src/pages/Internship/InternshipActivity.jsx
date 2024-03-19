import { ArrowIcon } from '../../components/Icons';
import InternshipPlaceholder from '../../components/Placeholder/InternshipPlaceholder';
import { useInternshipContext } from '../../hooks/useInternshipContext';
import { formatDate } from '../../utils/formatDate';
import InternshipNotFound from './InternshipNotFound';
import SidebarInternship from './SidebarInternship';
import { Link } from 'react-router-dom';

const InternshipActivity = () => {
  const { internship, loading } = useInternshipContext();
  return (
    <div className="grid grid-cols-3 gap-5">
      <div className="flex flex-col gap-4 lg:col-span-2 col-span-3">
        <Link to="/" className="flex items-center justify-center rotate-180 border border-neutral-300 rounded-full h-10 w-10 hover:bg-neutral-100 transition-all">
          <ArrowIcon />
        </Link>
        {loading ? (
          <InternshipPlaceholder />
        ) : internship.length === 0 ? (
          <InternshipNotFound />
        ) : (
          internship.map((item) => (
            <Link
              to={`/kegiatan-magang/detail`}
              state={{ internshipID: item.internship_id }}
              className="flex border items-center border-gray-200 rounded-xl p-4 hover:bg-primaryColor active:bg-activeColor hover:text-white transition-all"
              key={item.internship_id}
            >
              <div className="flex flex-1 flex-col">
                <p className="text-bold">Magang Mandiri</p>
                <p className="font-bold text-base">{item.instance}</p>
                <p>
                  Periode Magang: {formatDate(item.start_intern)} - {formatDate(item.end_intern)}
                </p>
              </div>
              <div>
                <ArrowIcon />
              </div>
            </Link>
          ))
        )}
      </div>
      <SidebarInternship />
    </div>
  );
};

export default InternshipActivity;
