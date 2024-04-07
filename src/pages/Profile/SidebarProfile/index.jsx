import { Link } from 'react-router-dom';
import { ArrowIcon } from '../../../components/Icons';
import StatusCard from './StatusCard';
import useFetchUserByID from '../../../features/user/useFetchUserById';

const SidebarProfile = () => {
  const { userByID } = useFetchUserByID();

  return (
    <div className="lg:col-span-1 gap-4 col-span-3 lg:flex flex-col top-5 lg:items-start w-full hidden">
      <Link to="/" className="flex lg:hidden items-center justify-center rotate-180 border border-neutral-300 rounded-full h-10 w-10 hover:bg-neutral-100 transition-all">
        <ArrowIcon />
      </Link>
      <div className="flex flex-col gap-2 text-base w-full">
        {userByID && (
          <>
            <StatusCard type="angkatan" title="Angkatan" status={userByID.angkatan} />
            <StatusCard type="status" title="Status" status={userByID.status} />
            <StatusCard type="instance" title="Perusahaan/Instansi" status={userByID?.Internships?.[0]?.instance} />
          </>
        )}
      </div>
    </div>
  );
};

export default SidebarProfile;
