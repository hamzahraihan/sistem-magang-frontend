import { Link } from 'react-router-dom';
import { ArrowIcon } from '../Icons';
import { useUserContext } from '../../hooks/useUserContext';
import { useEffect, useState } from 'react';

const ProfileButton = () => {
  const [userData, setUserData] = useState({});
  const { user } = useUserContext();

  useEffect(() => {
    setUserData(user[0]);
  }, [user]);

  return (
    <Link to={userData ? `/profile/${userData.role}/${userData.id}` : '/login'} className="flex flex-row lg:gap-5  p-4 items-center lg:border rounded-[32px] border-neutral-200 border-0 cursor-pointer lg:w-full w-fit">
      <div className="rounded-full bg-slate-400 animate-pulse  h-10 w-10 flex-shrink-0"></div>
      <div className="flex-col lg:flex md:hidden sm:hidden hidden">
        <p className="font-bold text-md">
          {userData ? userData.first_name : 'Belum login'} {userData ? userData.last_name : ''}
        </p>
        <p className="text-neutral-400 text-[10px] min-[1000px]:line-clamp-1">{userData ? userData.email : ''}</p>
      </div>
      <div className="xl:flex lg:hidden hidden ms-auto">
        <ArrowIcon />
      </div>
    </Link>
  );
};

export default ProfileButton;
