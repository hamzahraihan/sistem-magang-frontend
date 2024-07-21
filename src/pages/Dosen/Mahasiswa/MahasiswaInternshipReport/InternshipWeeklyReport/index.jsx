import { Link } from 'react-router-dom';
import { ArrowIcon } from '../../../../../components/Icons';
import DataLogbook from './DataInternship';
import WeeklyReport from './WeeklyReport';
import useFetchInternship from '../../../../../features/internship/useFetchInternship';

const InternshipWeeklyReport = () => {
  const { loading, internship } = useFetchInternship();

  return (
    <div className="flex flex-col col-span-3 gap-4">
      <Link
        to={`/dashboard/dosen/mahasiswa/logbook-mahasiswa/${internship.mahasiswa_id}`}
        className="flex items-center justify-center rotate-180 border border-neutral-300 rounded-full h-10 w-10 hover:bg-neutral-100 transition-all bg-white"
      >
        <ArrowIcon />
      </Link>
      <DataLogbook data={internship} loading={loading} />
      <WeeklyReport />
    </div>
  );
};

export default InternshipWeeklyReport;
