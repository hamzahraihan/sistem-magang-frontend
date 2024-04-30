import { Link } from 'react-router-dom';
import { ArrowIcon } from '../../../components/Icons';
import Table from './Table';
import { useUserContext } from '../../../hooks/useUserContext';

// Logbook view for dosen role
const Mahasiswa = () => {
  const { userLoggedInData } = useUserContext();
  return (
    <div className="col-span-3 pb-10">
      <div className="flex flex-col gap-4 lg:col-span-2 col-span-3">
        <Link to="/" className="flex items-center justify-center rotate-180 border border-neutral-300 rounded-full h-10 w-10 hover:bg-neutral-100 transition-all bg-white">
          <ArrowIcon />
        </Link>
        <div className="flex flex-col">
          <h1 className="text-xl font-bold">Daftar Mahasiswa</h1>
          <p className="text-sm">
            Dosen wali: {userLoggedInData?.first_name} {userLoggedInData?.last_name}
          </p>
        </div>
        <Table />
      </div>
    </div>
  );
};

export default Mahasiswa;
