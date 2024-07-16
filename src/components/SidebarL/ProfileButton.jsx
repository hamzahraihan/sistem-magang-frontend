import { NavLink } from 'react-router-dom';
import { ArrowIcon, UserIcon } from '../Icons';
import { useUserContext } from '../../hooks/useUserContext';
import _ from 'lodash';
import Avvvatars from 'avvvatars-react';

const ProfileButton = () => {
  const { userLoggedInData } = useUserContext();

  const slugify = () => {
    const full_name = `${userLoggedInData.first_name} ${userLoggedInData.last_name}`;
    const slug_name = _.kebabCase(full_name);
    return slug_name;
  };

  return (
    <NavLink
      to={userLoggedInData ? `/profile/${userLoggedInData?.role}/${_.kebabCase(slugify())}` : '/login'}
      state={{ userId: userLoggedInData?.id }}
      className="flex flex-row lg:gap-2  p-4 items-center lg:border rounded-[32px] border-neutral-200 border-0 cursor-pointer lg:w-full w-fit bg-white"
    >
      {!userLoggedInData && <UserIcon />}

      {userLoggedInData?.image ? (
        <img src={`https://drive.google.com/thumbnail?id=${userLoggedInData?.image}&sz=w600`} className="h-10 w-10 flex-shrink-0 rounded-full object-cover object-center" alt="profile-pict" />
      ) : (
        <>
          {userLoggedInData?.first_name && userLoggedInData?.last_name && (
            <>
              <Avvvatars value={userLoggedInData.first_name + userLoggedInData.last_name} displayValue={_.capitalize(userLoggedInData.first_name[0]) + _.capitalize(userLoggedInData.last_name[0])} size={40} />
            </>
          )}
        </>
      )}
      <div className="flex-col w-fit lg:flex md:hidden sm:hidden hidden line-clamp-1 ">
        <p className="font-bold text-md">
          {userLoggedInData ? userLoggedInData?.first_name : 'Silahkan login'} {userLoggedInData ? userLoggedInData?.last_name : ''}
        </p>
        <p className="text-neutral-400 text-[10px] truncate">{userLoggedInData ? userLoggedInData?.email : ''}</p>
      </div>
      <div className="xl:flex lg:hidden hidden ms-auto">
        <ArrowIcon />
      </div>
    </NavLink>
  );
};

export default ProfileButton;
