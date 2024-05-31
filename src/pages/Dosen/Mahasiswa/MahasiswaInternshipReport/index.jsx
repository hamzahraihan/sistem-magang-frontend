import { Link } from 'react-router-dom';
import DataMahasiswa from './DataMahasiswa';
import LogbookMahasiswa from './LogbookMahasiswa';
import { ArrowIcon } from '../../../../components/Icons';

const MahasiswaInternshipReport = () => {
  return (
    <div className="flex flex-col col-span-3 gap-4 min-w-full">
      <Link to="/dashboard/dosen/mahasiswa" className="flex items-center justify-center rotate-180 border border-neutral-300 rounded-full h-10 w-10 hover:bg-neutral-100 transition-all bg-white">
        <ArrowIcon />
      </Link>
      <DataMahasiswa />
      <LogbookMahasiswa />
    </div>
  );
};

export default MahasiswaInternshipReport;
