import { NavLink } from 'react-router-dom';
import { DocumentIcon, GuideIcon, LecturerIcon, NewsIcon, OfficeBrifcase, UploadIcon, UserIcon } from '../Icons';
import { useUserContext } from '../../hooks/useUserContext';
import ProfileMenu from './ProfileMenu';

const Navigation = () => {
  const { userLoggedInData } = useUserContext();

  const activeNavButton = 'bg-primaryColor hover:bg-hoverColor duration-150 ease-out text-white rounded-full p-4';
  const notActiveNavButton = 'bg-white';

  if (userLoggedInData?.role == 'mahasiswa' || !userLoggedInData) {
    return (
      <>
        <NavLink to="/kegiatan-magang" className={({ isActive }) => (isActive ? activeNavButton : notActiveNavButton)}>
          <OfficeBrifcase />
        </NavLink>

        <ProfileMenu />

        <NavLink to="/report" className={({ isActive }) => (isActive ? activeNavButton : notActiveNavButton)}>
          <UploadIcon />
        </NavLink>

        <NavLink to="https://drive.google.com/drive/u/1/folders/13_CQ53O0eIKVCQsuSVlHAqvMFFQD7m6-" className={({ isActive }) => (isActive ? activeNavButton : notActiveNavButton)}>
          <DocumentIcon />
        </NavLink>

        <NavLink to="https://docs.google.com/presentation/d/1vZLuBXoQ84byioTcmqQkeYT6NGPn47R18V_48OF6g9A/edit?usp=sharing" className={({ isActive }) => (isActive ? activeNavButton : notActiveNavButton)}>
          <GuideIcon />
        </NavLink>
      </>
    );
  } else if (userLoggedInData.role == 'dosen') {
    return (
      <>
        <ProfileMenu />
        <NavLink to="/dashboard/dosen/mahasiswa" className={({ isActive }) => (isActive ? activeNavButton : notActiveNavButton)}>
          <UserIcon />
        </NavLink>
        <NavLink to="/dashboard/mahasiswa/laporan-akhir" className={({ isActive }) => (isActive ? activeNavButton : notActiveNavButton)}>
          <DocumentIcon />
        </NavLink>
      </>
    );
  } else if (userLoggedInData.role == 'admin') {
    return (
      <>
        <NavLink to="/dashboard/admin/mahasiswa" className={({ isActive }) => (isActive ? activeNavButton : notActiveNavButton)}>
          <UserIcon />
        </NavLink>
        <ProfileMenu />
        <NavLink to="/dashboard/admin/dosen" className={({ isActive }) => (isActive ? activeNavButton : notActiveNavButton)}>
          <LecturerIcon />
        </NavLink>
        <NavLink to="/dashboard/admin/post" className={({ isActive }) => (isActive ? activeNavButton : notActiveNavButton)}>
          <NewsIcon />
        </NavLink>
      </>
    );
  }
};

export default Navigation;
