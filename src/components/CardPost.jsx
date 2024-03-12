import { Link } from 'react-router-dom';
import { ClockIcon, TagIcon } from './Icons';
import { formatDate } from '../utils/formatDate';
import PropTypes from 'prop-types';

const CardPost = (props) => {
  const { post } = props;

  return (
    <div className="border border-neutral-200 rounded-[32px]">
      <Link to={`/detail-post/${post.post_id}`}>
        <div className="bg-slate-300 animate-pulse h-48 rounded-se-[32px] rounded-ss-[32px] "></div>
      </Link>
      <div className="flex flex-col gap-3 p-7">
        <div className="flex gap-2">
          <p className="flex gap-1 items-center text-neutral-700 text-sm">
            <ClockIcon />
            {formatDate(post.updatedAt)}
          </p>
          <p className="flex gap-1 items-center text-neutral-700 text-sm">
            <TagIcon />
            {post.category_name}
          </p>
        </div>
        <p className="text-base font-bold">{post.title}</p>
        <p className="line-clamp-3">{post.description}</p>

        <p className="text-neutral-400 underline">
          {post.Mahasiswa?.first_name}
          {post.Dosen?.first_name}
          {post.Admin?.first_name}
        </p>
      </div>
    </div>
  );
};

CardPost.propTypes = {
  post: PropTypes.object,
};

export default CardPost;
