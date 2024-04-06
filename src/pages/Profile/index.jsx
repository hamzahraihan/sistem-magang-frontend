import { Link } from 'react-router-dom';
import { ArrowIcon } from '../../components/Icons';
import SidebarProfile from './SidebarProfile';
import CardPost from '../../components/CardPost';
import ProfilePlaceholder from './Placeholder';
import { usePostContext } from '../../hooks/usePostContext';
import CardPostPlaceholder from '../../components/Placeholder/CardPostPlaceholder';
import useFetchUserByID from '../../features/user/useFetchUserById';
import _ from 'lodash';

const Profile = () => {
  const { loading, userByID } = useFetchUserByID();

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
                {userByID.image ? (
                  <img className="border border-neutral-400 h-52 w-52  bg-slate-500 animate-pulse rounded-full" alt="profile-pict"></img>
                ) : (
                  <div className="flex text-5xl font-bold bg-activeColor rounded-full h-52 w-52 items-center justify-center text-white">
                    <p>{_.capitalize(userByID.first_name[0])}</p> <p>{_.capitalize(userByID.last_name[0])}</p>
                  </div>
                )}

                <p className="font-bold text-base rounded-xl bg-activeColor py-2 px-4 w-fit text-white">
                  {userByID.first_name} {userByID.last_name}
                </p>
                <p className="text-neutral-400">{userByID.email}</p>
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
