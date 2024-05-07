import { NavLink } from 'react-router-dom';
import { DocumentIcon, OfficeBrifcase, UploadIcon, UserIcon } from '../Icons';
import { useUserContext } from '../../hooks/useUserContext';
import ProfileMenu from './ProfileMenu';

const Navigation = () => {
  const { userLoggedInData } = useUserContext();

  if (userLoggedInData?.role == 'mahasiswa' || !userLoggedInData) {
    return (
      <>
        <NavLink to="/kegiatan-magang" className={({ isActive }) => (isActive ? 'bg-primaryColor hover:bg-hoverColor duration-150 ease-out text-white rounded-full p-4' : 'bg-white')}>
          <OfficeBrifcase />
        </NavLink>

        <ProfileMenu />

        <NavLink to="/report" className={({ isActive }) => (isActive ? 'bg-primaryColor hover:bg-hoverColor duration-150 ease-out text-white rounded-full p-4' : 'bg-white')}>
          <UploadIcon />
        </NavLink>

        <NavLink
          to="https://drive.google.com/drive/u/1/folders/13_CQ53O0eIKVCQsuSVlHAqvMFFQD7m6-"
          className={({ isActive }) => (isActive ? 'bg-primaryColor hover:bg-hoverColor duration-150 ease-out text-white rounded-full p-4' : 'bg-white')}
        >
          <DocumentIcon />
        </NavLink>
      </>
    );
  } else if (userLoggedInData.role == 'dosen') {
    return (
      <>
        <ProfileMenu />
        <NavLink to="/dashboard/dosen/mahasiswa" className={({ isActive }) => (isActive ? 'bg-primaryColor hover:bg-hoverColor duration-150 ease-out text-white rounded-full p-4' : 'bg-white')}>
          <UserIcon />
          <p className="lg:flex hidden">Mahasiswa</p>
        </NavLink>
      </>
    );
  }
};

export default Navigation;
