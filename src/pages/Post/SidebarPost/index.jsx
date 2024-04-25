import { Link } from 'react-router-dom';
import { Spinner } from '../../../components/Icons';
import { usePostContext } from '../../../hooks/usePostContext';
import SidebarCard from './SidebarCard';
import Avvvatars from 'avvvatars-react';
import _ from 'lodash';
import { pickRole } from '../../../utils/pickRole';
import { slugify } from '../../../utils/slugify';
import { getRoleId } from '../../../utils/getRoleId';

const SidebarPost = () => {
  const { loadingPost, postById, post } = usePostContext();

  return (
    <div className="lg:flex flex-col top-5 lg:items-start  hidden">
      <div className="flex flex-col items-center w-full gap-5">
        <h1 className="text-xl font-bold text-start w-full">Tentang Author</h1>
        {pickRole(postById[0])?.image ? (
          <img src={pickRole(postById[0]).image} className="h-28 w-28  rounded-full" alt="profile-author" />
        ) : (
          <Link to={`/profile/${postById[0]?.role}/${_.kebabCase(slugify(postById[0]))}`} state={{ userId: getRoleId(postById[0]) }} className="flex items-center gap-2 w-fit ">
            <Avvvatars value={pickRole(postById[0])?.first_name + pickRole(postById[0])?.last_name} displayValue={_.capitalize(pickRole(postById[0])?.first_name[0]) + _.capitalize(pickRole(postById[0])?.last_name[0])} size={150} />
          </Link>
        )}

        <div className="text-center">
          <p className="text-sm font-bold">
            {pickRole(postById[0])?.first_name} {pickRole(postById[0])?.last_name}
          </p>
          <p className="text-xs text-neutral-500 pb-2">{pickRole(postById[0])?.email}</p>
        </div>
        <div className="flex flex-col gap-3 pb-10 w-full">
          <p className="text-lg font-bold">Post Lainnya</p>
          {loadingPost ? (
            <Spinner />
          ) : (
            post
              .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
              .slice(0, 5)
              .map((item) => <SidebarCard key={item.post_id} post={item} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default SidebarPost;
