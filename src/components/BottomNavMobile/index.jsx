import { NavLink } from 'react-router-dom';
import HomeIcon, { DocumentIcon, OfficeBrifcase, UploadIcon, UserIcon } from '../Icons';
import { useUserContext } from '../../hooks/useUserContext';
import _ from 'lodash';
import { useState } from 'react';
import Avvvatars from 'avvvatars-react';

const BottomNavMobile = () => {
  const [openProfile, setOpenProfile] = useState(false);
  const { userLoggedInData, handleLogout } = useUserContext();

  const slugify = () => {
    const full_name = `${userLoggedInData.first_name} ${userLoggedInData.last_name}`;
    const slug_name = _.kebabCase(full_name);
    return slug_name;
  };

  const handleOpenMenu = () => {
    if (openProfile) {
      setOpenProfile(false);
    } else if (!openProfile) {
      setOpenProfile(true);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 bg-white border-t h-16 w-full m-auto lg:hidden md:hidden sm:hidden">
      <div className="grid grid-cols-5 h-full place-items-center">
        <NavLink to="/" className={({ isActive }) => (isActive ? 'bg-primaryColor hover:bg-hoverColor duration-150 ease-out text-white rounded-full p-4' : 'bg-white')}>
          <HomeIcon />
        </NavLink>

        <NavLink to="/kegiatan-magang" className={({ isActive }) => (isActive ? 'bg-primaryColor hover:bg-hoverColor duration-150 ease-out text-white rounded-full p-4' : 'bg-white')}>
          <OfficeBrifcase />
        </NavLink>

        {userLoggedInData ? (
          <div className="relative">
            {userLoggedInData?.image ? (
              <button type="button" className="rounded-full" onClick={handleOpenMenu}>
                <img
                  src={`https://drive.google.com/thumbnail?id=${userLoggedInData.image || userLoggedInData.image.name}&sz=w600`}
                  className="border border-neutral-400 rounded-full object-cover object-center h-10 w-10"
                  alt="profile-pict"
                />
              </button>
            ) : (
              <>
                {userLoggedInData?.first_name && userLoggedInData?.last_name && (
                  <button type="button" onClick={handleOpenMenu}>
                    <Avvvatars value={userLoggedInData.first_name + userLoggedInData.last_name} displayValue={_.capitalize(userLoggedInData.first_name[0]) + _.capitalize(userLoggedInData.last_name[0])} size={40} on />
                  </button>
                )}
              </>
            )}
            {openProfile && (
              <div className="absolute bottom-16 -right-[89px] border shadow-lg rounded-xl text-sm">
                <div className="flex flex-col-reverse p-2 bg-white rounded-xl">
                  <NavLink
                    className=" hover:bg-gray-200 active:bg-gray-100 rounded-lg duration-150 p-2 w-52 text-center"
                    to={userLoggedInData ? `/profile/${userLoggedInData?.role}/${_.kebabCase(slugify())}` : '/login'}
                    state={{ userId: userLoggedInData?.id }}
                    onClick={handleOpenMenu}
                  >
                    <p>Profil</p>
                  </NavLink>
                  <button className=" hover:bg-gray-200 active:bg-gray-100 rounded-lg duration-150 p-2 w-52 text-center" onClick={handleLogout}>
                    <p>Log Out</p>
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <NavLink to="/login">
            <UserIcon />
          </NavLink>
        )}

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
