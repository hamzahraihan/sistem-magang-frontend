import { NavLink } from 'react-router-dom';
import HomeIcon, { DocumentIcon, OfficeBrifcase, UploadIcon, UserIcon } from '../Icons';
import { useUserContext } from '../../hooks/useUserContext';
import _ from 'lodash';

const BottomNavMobile = () => {
  const { userLoggedInData } = useUserContext();

  const slugify = () => {
    const full_name = `${userLoggedInData.first_name} ${userLoggedInData.last_name}`;
    const slug_name = _.kebabCase(full_name);
    return slug_name;
  };

  return (
    <div className="fixed bottom-0 left-0 bg-white h-20 w-full m-auto lg:hidden md:hidden sm:hidden">
      <div className="grid grid-cols-5 h-full place-items-center">
        <NavLink to="/" className={({ isActive }) => (isActive ? 'bg-primaryColor hover:bg-hoverColor duration-150 ease-out text-white rounded-full p-4' : 'bg-white')}>
          <HomeIcon />
        </NavLink>

        <NavLink to="/kegiatan-magang" className={({ isActive }) => (isActive ? 'bg-primaryColor hover:bg-hoverColor duration-150 ease-out text-white rounded-full p-4' : 'bg-white')}>
          <OfficeBrifcase />
        </NavLink>

        <NavLink to={userLoggedInData ? `/profile/${userLoggedInData?.role}/${_.kebabCase(slugify())}` : '/login'} state={{ userId: userLoggedInData?.id }}>
          {userLoggedInData ? <div className="rounded-full bg-slate-400 animate-pulse  h-10 w-10 flex-shrink-0"></div> : <UserIcon />}
        </NavLink>

        <NavLink to="/report" className={({ isActive }) => (isActive ? 'bg-primaryColor hover:bg-hoverColor duration-150 ease-out text-white rounded-full p-4' : 'bg-white')}>
          <UploadIcon />
        </NavLink>

        <NavLink to="/berkas" className={({ isActive }) => (isActive ? 'bg-primaryColor hover:bg-hoverColor duration-150 ease-out text-white rounded-full p-4' : 'bg-white')}>
          <DocumentIcon />
        </NavLink>
      </div>
    </div>
  );
};

export default BottomNavMobile;
