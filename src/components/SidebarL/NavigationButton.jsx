import { NavLink } from 'react-router-dom';
import { DocumentIcon, GuideIcon, HomeIcon, LecturerIcon, NewsIcon, OfficeBrifcase, UploadIcon, UserIcon } from '../Icons';
import { useUserContext } from '../../hooks/useUserContext';

const activeNavButton = 'flex items-center gap-2 p-4 bg-primaryColor active:bg-activeColor hover:bg-hoverColor text-white rounded-[24px] transition-all ease-in-out duration-150 cursor-pointer lg:w-full md:w-full w-fit';

const notActiveNavButton = 'flex items-center gap-2 p-4 hover:bg-primaryColor active:bg-activeColor hover:text-white rounded-[24px] transition-all ease-in-out duration-150 cursor-pointer lg:w-full md:w-full w-fit';

const Navigation = () => {
  const { userLoggedInData } = useUserContext();

  if (userLoggedInData?.role == 'mahasiswa' || !userLoggedInData) {
    return (
      <>
        <NavLink to="/kegiatan-magang" className={({ isActive }) => (isActive ? activeNavButton : notActiveNavButton)}>
          <OfficeBrifcase />
          <p className="lg:flex hidden">Kegiatan Magang</p>
        </NavLink>
        <NavLink to="/report" className={({ isActive }) => (isActive ? activeNavButton : notActiveNavButton)}>
          <UploadIcon />
          <p className="lg:flex hidden">Upload Laporan</p>
        </NavLink>
        <NavLink to="https://drive.google.com/drive/u/1/folders/13_CQ53O0eIKVCQsuSVlHAqvMFFQD7m6-" target="_blank" className={({ isActive }) => (isActive ? activeNavButton : notActiveNavButton)} rel="noopener noreferrer">
          <DocumentIcon />
          <p className="lg:flex hidden">Berkas Magang</p>
        </NavLink>
        <NavLink
          to="https://docs.google.com/presentation/d/1vZLuBXoQ84byioTcmqQkeYT6NGPn47R18V_48OF6g9A/edit?usp=sharing"
          target="_blank"
          className={({ isActive }) => (isActive ? activeNavButton : notActiveNavButton)}
          rel="noopener noreferrer"
        >
          <GuideIcon />
          <p className="lg:flex hidden">Panduan Magang</p>
        </NavLink>
      </>
    );
  } else if (userLoggedInData.role == 'dosen') {
    return (
      <>
        <NavLink to="/dashboard/dosen/mahasiswa" className={({ isActive }) => (isActive ? activeNavButton : notActiveNavButton)}>
          <UserIcon />
          <p className="lg:flex hidden">Mahasiswa</p>
        </NavLink>
        <NavLink to="/dashboard/mahasiswa/laporan-akhir" className={({ isActive }) => (isActive ? activeNavButton : notActiveNavButton)}>
          <DocumentIcon />
          <p className="lg:flex hidden">Laporan Akhir</p>
        </NavLink>
      </>
    );
  } else if (userLoggedInData.role == 'admin') {
    return (
      <>
        <NavLink to="/dashboard/admin/mahasiswa" className={({ isActive }) => (isActive ? activeNavButton : notActiveNavButton)}>
          <UserIcon />
          <p className="lg:flex hidden">Mahasiswa</p>
        </NavLink>
        <NavLink to="/dashboard/admin/dosen" className={({ isActive }) => (isActive ? activeNavButton : notActiveNavButton)}>
          <LecturerIcon />
          <p className="lg:flex hidden">Dosen</p>
        </NavLink>
        <NavLink to="/dashboard/admin/post" className={({ isActive }) => (isActive ? activeNavButton : notActiveNavButton)}>
          <NewsIcon />
          <p className="lg:flex hidden">Post</p>
        </NavLink>
      </>
    );
  }
};

const NavigationButton = () => {
  return (
    <nav className="flex flex-col p-7 gap-4 border border-neutral-200 rounded-[48px] lg:w-full w-fit bg-white">
      <NavLink to="/" className={({ isActive }) => (isActive ? activeNavButton : notActiveNavButton)}>
        <HomeIcon />
        <p className="lg:flex hidden">Beranda</p>
      </NavLink>
      {/* conditional rendering  */}
      <Navigation />
    </nav>
  );
};

export default NavigationButton;
