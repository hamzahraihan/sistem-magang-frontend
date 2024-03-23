import { NavLink } from 'react-router-dom';
import { DocumentIcon, HomeIcon, LogbookIcon, OfficeBrifcase, UploadIcon } from '../Icons';

const NavigationButton = () => {
  return (
    <nav className="flex flex-col p-7 gap-4 border border-neutral-200 rounded-[48px] lg:w-full w-fit">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? 'flex items-center gap-2 p-4 bg-primaryColor active:bg-activeColor hover:bg-hoverColor text-white rounded-[24px] transition-all ease-in-out duration-150 cursor-pointer lg:w-full md:w-full w-fit'
            : 'flex items-center gap-2 p-4 hover:bg-primaryColor active:bg-activeColor hover:text-white rounded-[24px] transition-all ease-in-out duration-150 cursor-pointer lg:w-full md:w-full w-fit'
        }
      >
        <HomeIcon />
        <p className="lg:flex hidden">Beranda</p>
      </NavLink>
      <NavLink
        to="/kegiatan-magang"
        className={({ isActive }) =>
          isActive
            ? 'flex items-center gap-2 p-4 bg-primaryColor active:bg-activeColor hover:bg-hoverColor text-white rounded-[24px] transition-all ease-in-out duration-150 cursor-pointer lg:w-full md:w-full w-fit'
            : 'flex items-center gap-2 p-4 hover:bg-primaryColor active:bg-activeColor hover:text-white rounded-[24px] transition-all ease-in-out duration-150 cursor-pointer lg:w-full md:w-full w-fit'
        }
      >
        <OfficeBrifcase />
        <p className="lg:flex hidden">Kegiatan Magang</p>
      </NavLink>
      {/* <NavLink
        to="/logbook"
        className={({ isActive }) =>
          isActive
            ? 'flex items-center gap-2 p-4 bg-primaryColor active:bg-activeColor hover:bg-hoverColor text-white rounded-[24px] transition-all ease-in-out duration-150 cursor-pointer lg:w-full md:w-full w-fit'
            : 'flex items-center gap-2 p-4 hover:bg-primaryColor active:bg-activeColor hover:text-white rounded-[24px] transition-all ease-in-out duration-150 cursor-pointer lg:w-full md:w-full w-fit'
        }
      >
        <LogbookIcon />
        <p className="lg:flex hidden">Logbook</p>
      </NavLink> */}
      <NavLink
        to="/upload-report"
        className={({ isActive }) =>
          isActive
            ? 'flex items-center gap-2 p-4 bg-primaryColor active:bg-activeColor hover:bg-hoverColor text-white rounded-[24px] transition-all ease-in-out duration-150 cursor-pointer lg:w-full md:w-full w-fit'
            : 'flex items-center gap-2 p-4 hover:bg-primaryColor active:bg-activeColor hover:text-white rounded-[24px] transition-all ease-in-out duration-150 cursor-pointer lg:w-full md:w-full w-fit'
        }
      >
        <UploadIcon />
        <p className="lg:flex hidden">Upload Laporan</p>
      </NavLink>
      <NavLink
        to="/laporan"
        className={({ isActive }) =>
          isActive
            ? 'flex items-center gap-2 p-4 bg-primaryColor active:bg-activeColor hover:bg-hoverColor text-white rounded-[24px] transition-all ease-in-out duration-150 cursor-pointer lg:w-full md:w-full w-fit'
            : 'flex items-center gap-2 p-4 hover:bg-primaryColor active:bg-activeColor hover:text-white rounded-[24px] transition-all ease-in-out duration-150 cursor-pointer lg:w-full md:w-full w-fit'
        }
      >
        <DocumentIcon />
        <p className="lg:flex hidden">Berkas Magang</p>
      </NavLink>
    </nav>
  );
};

export default NavigationButton;
