import { Link } from 'react-router-dom';
import { ArrowIcon } from '../../../components/Icons';
import Table from './Table';

// Logbook view for dosen role
const LogbookDosen = () => {
  return (
    <div className="col-span-3 pb-10">
      <div className="flex flex-col gap-4 lg:col-span-2 col-span-3">
        <Link to="/" className="flex items-center justify-center rotate-180 border border-neutral-300 rounded-full h-10 w-10 hover:bg-neutral-100 transition-all bg-white">
          <ArrowIcon />
        </Link>
        <h1 className="text-xl font-bold">Logbook Mahasiswa</h1>
        <Table />
      </div>
    </div>
  );
};

export default LogbookDosen;
