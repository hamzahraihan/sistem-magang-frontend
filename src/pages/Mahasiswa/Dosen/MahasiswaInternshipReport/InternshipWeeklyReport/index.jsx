import { Link } from 'react-router-dom';
import useFetchInternshipById from '../../../../../features/internship/useFetchInternshipById';
import { ArrowIcon } from '../../../../../components/Icons';
import DataLogbook from './DataLogbook';
import WeeklyReport from './WeeklyReport';

const InternshipWeeklyReport = () => {
  const { loading, internshipByID } = useFetchInternshipById();
  console.log('🚀 ~ InternshipWeeklyReport ~ internshipByID:', internshipByID);

  return (
    <div className="flex flex-col col-span-3 gap-4">
      <Link
        to={`/dashboard/dosen/mahasiswa/logbook-mahasiswa/${internshipByID.mahasiswa_id}`}
        className="flex items-center justify-center rotate-180 border border-neutral-300 rounded-full h-10 w-10 hover:bg-neutral-100 transition-all bg-white"
      >
        <ArrowIcon />
      </Link>
      <DataLogbook data={internshipByID} loading={loading} />
      <WeeklyReport />
    </div>
  );
};

export default InternshipWeeklyReport;
