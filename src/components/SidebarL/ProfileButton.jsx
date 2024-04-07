import { Link } from 'react-router-dom';
import { ArrowIcon } from '../Icons';
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
    <Link
      to={userLoggedInData ? `/profile/${userLoggedInData?.role}/${_.kebabCase(slugify())}` : '/login'}
      state={{ userId: userLoggedInData?.id }}
      className="flex flex-row lg:gap-5  p-4 items-center lg:border rounded-[32px] border-neutral-200 border-0 cursor-pointer lg:w-full w-fit"
    >
      {userLoggedInData?.image ? (
        <div className="rounded-full bg-slate-400 animate-pulse  h-10 w-10 flex-shrink-0"></div>
      ) : (
        <>
          {userLoggedInData?.first_name && userLoggedInData?.last_name && (
            <>
              <Avvvatars value={userLoggedInData.first_name + userLoggedInData.last_name} displayValue={_.capitalize(userLoggedInData.first_name[0]) + _.capitalize(userLoggedInData.last_name[0])} size={40} />
            </>
          )}
        </>
      )}
      <div className="flex-col lg:flex md:hidden sm:hidden hidden">
        <p className="font-bold text-md">
          {userLoggedInData ? userLoggedInData?.first_name : 'Silahkan login'} {userLoggedInData ? userLoggedInData?.last_name : ''}
        </p>
        <p className="text-neutral-400 text-[10px] min-[1000px]:line-clamp-1">{userLoggedInData ? userLoggedInData?.email : ''}</p>
      </div>
      <div className="xl:flex lg:hidden hidden ms-auto">
        <ArrowIcon />
      </div>
    </Link>
  );
};

export default ProfileButton;
