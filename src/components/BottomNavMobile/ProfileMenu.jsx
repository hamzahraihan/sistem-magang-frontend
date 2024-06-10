import { NavLink } from 'react-router-dom';
import { UserIcon } from '../Icons';
import { useUserContext } from '../../hooks/useUserContext';
import _ from 'lodash';
import Avvvatars from 'avvvatars-react';
import { Dropdown } from 'flowbite-react';

const ProfileMenu = () => {
  const { userLoggedInData, handleLogout } = useUserContext();

  const slugify = () => {
    const full_name = `${userLoggedInData.first_name} ${userLoggedInData.last_name}`;
    const slug_name = _.kebabCase(full_name);
    return slug_name;
  };

  return (
    <>
      {userLoggedInData ? (
        <div className="relative">
          {userLoggedInData?.image ? (
            <Dropdown
              arrowIcon={false}
              inline
              placement="top"
              label={
                <img
                  src={`https://drive.google.com/thumbnail?id=${userLoggedInData.image || userLoggedInData.image.name}&sz=w600`}
                  className="border border-neutral-400 rounded-full object-cover object-center h-10 w-10"
                  alt="profile-pict"
                />
              }
            >
              <Dropdown.Header>
                <span className="block text-sm">
                  {userLoggedInData.first_name} {userLoggedInData.last_name}
                </span>
                <span className="block truncate text-sm font-medium">{userLoggedInData.email}</span>
              </Dropdown.Header>
              <Dropdown.Item>
                <NavLink to={userLoggedInData ? `/profile/${userLoggedInData?.role}/${_.kebabCase(slugify())}` : '/login'} state={{ userId: userLoggedInData?.id }} className="text-start w-full">
                  Profil
                </NavLink>
              </Dropdown.Item>

              <Dropdown.Item onClick={handleLogout}>Keluar</Dropdown.Item>
            </Dropdown>
          ) : (
            <>
              {userLoggedInData?.first_name && userLoggedInData?.last_name && (
                <Dropdown
                  arrowIcon={false}
                  inline
                  placement="top"
                  label={<Avvvatars value={userLoggedInData.first_name + userLoggedInData.last_name} displayValue={_.capitalize(userLoggedInData.first_name[0]) + _.capitalize(userLoggedInData.last_name[0])} size={40} />}
                >
                  <Dropdown.Header>
                    <span className="block text-sm">
                      {userLoggedInData.first_name} {userLoggedInData.last_name}
                    </span>
                    <span className="block truncate text-sm font-medium">{userLoggedInData.email}</span>
                  </Dropdown.Header>
                  <Dropdown.Item>
                    <NavLink to={userLoggedInData ? `/profile/${userLoggedInData?.role}/${_.kebabCase(slugify())}` : '/login'} state={{ userId: userLoggedInData?.id }} className="text-start w-full">
                      Profil
                    </NavLink>
                  </Dropdown.Item>
                  <Dropdown.Item onClick={handleLogout}>Keluar</Dropdown.Item>
                </Dropdown>
              )}
            </>
          )}
        </div>
      ) : (
        <NavLink to="/login">
          <UserIcon />
        </NavLink>
      )}
    </>
  );
};

export default ProfileMenu;
