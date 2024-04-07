import { Link } from 'react-router-dom';
import { ArrowIcon, EditIcon } from '../../components/Icons';
import CardPost from '../../components/CardPost';
import ProfilePlaceholder from './Placeholder';
import { usePostContext } from '../../hooks/usePostContext';
import CardPostPlaceholder from '../../components/Placeholder/CardPostPlaceholder';
import useFetchUserByID from '../../features/user/useFetchUserById';
import _ from 'lodash';
import SidebarProfile from './SidebarProfile';
import Avvvatars from 'avvvatars-react';
import { useUserContext } from '../../hooks/useUserContext';
import StatusCard from './SidebarProfile/StatusCard';

const Profile = () => {
  const { loading, userByID } = useFetchUserByID();
  const { userLoggedInData } = useUserContext();

  const { loadingPostByUser, postByUser } = usePostContext();

  return (
    <div className="col-span-3 pb-10">
      <div className="grid grid-cols-3 gap-5 ">
        <div className="lg:order-first flex flex-col gap-4 lg:col-span-2 col-span-3 order-last">
          <Link to="/" className="lg:flex hidden items-center justify-center rotate-180 border border-neutral-300 rounded-full h-10 w-10 hover:bg-neutral-100 transition-all">
            <ArrowIcon />
          </Link>
          {loading ? (
            <ProfilePlaceholder />
          ) : (
            <>
              <h1 className="text-xl font-bold">Profile</h1>
              <div className="flex flex-col gap-2 justify-center items-center m-auto">
                {userByID?.image ? (
                  <img className="border border-neutral-400 h-52 w-52  bg-slate-500 animate-pulse rounded-full" alt="profile-pict"></img>
                ) : (
                  <>
                    {userByID?.first_name && userByID?.last_name && (
                      <div className="relative">
                        <Avvvatars value={userByID.first_name + userByID.last_name} displayValue={_.capitalize(userByID.first_name[0]) + _.capitalize(userByID.last_name[0])} size={200} />
                        {userLoggedInData.id == userByID.mahasiswa_id && (
                          <Link to="/" className="absolute top-1 right-0 flex items-center rounded-full bg-white p-3 hover:bg-gray-300 active:bg-gray-200 duration-150">
                            <EditIcon />
                          </Link>
                        )}
                      </div>
                    )}
                  </>
                )}

                <div className="flex gap-2">
                  <p className="font-bold text-base rounded-xl bg-activeColor py-2 px-4 w-fit text-white">
                    {userByID.first_name} {userByID.last_name}
                  </p>
                </div>
                <p className="text-neutral-400">{userByID.email}</p>
              </div>
              <div className="flex flex-col gap-2 text-base w-full lg:hidden">
                {userByID && (
                  <>
                    <StatusCard type="angkatan" title="Angkatan" status={userByID.angkatan} />
                    <StatusCard type="status" title="Status" status={userByID.status} />
                    <StatusCard type="instance" title="Perusahaan/Instansi" status={userByID?.Internships?.[0]?.instance} />
                  </>
                )}
              </div>
            </>
          )}
          <p className="text-xl font-bold">Post Terbaru</p>
          {loadingPostByUser ? <CardPostPlaceholder /> : postByUser.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)).map((item) => <CardPost key={item.post_id} post={item} />)}
        </div>
        <SidebarProfile />
      </div>
    </div>
  );
};

export default Profile;
