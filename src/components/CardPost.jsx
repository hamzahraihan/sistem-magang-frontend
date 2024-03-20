import { Link } from 'react-router-dom';
import { ClockIcon, TagIcon } from './Icons';
import { formatDate } from '../utils/formatDate';
import PropTypes from 'prop-types';
import _ from 'lodash';

const CardPost = (props) => {
  const { post } = props;

  const imageBackground = {
    backgroundImage: `url(https://drive.google.com/thumbnail?id=${post?.image}&sz=w1000)`,
  };

  return (
    <Link to={`/detail-post/${_.kebabCase(post?.title)}`} state={{ post_id: post?.post_id }} className="border border-neutral-200 rounded-[32px]">
      <div>{post.image && <div className="h-48 rounded-se-[32px] rounded-ss-[32px] bg-cover bg-no-repeat bg-center" style={imageBackground}></div>}</div>
      <div className="flex flex-col gap-3 p-7">
        <div className="flex gap-2">
          <p className="flex gap-1 items-center text-neutral-700 text-sm">
            <ClockIcon />
            {formatDate(post?.updatedAt)}
          </p>
          <p className="flex gap-1 items-center text-neutral-700 text-sm">
            <TagIcon />
            {post?.category_name}
          </p>
        </div>
        <p className="text-base font-bold">{post?.title}</p>
        <p className="line-clamp-3" dangerouslySetInnerHTML={{ __html: post?.description }} />

        <p className="text-neutral-400 underline">
          {post?.Mahasiswa?.first_name}
          {post?.Dosen?.first_name}
          {post?.Admin?.first_name}
        </p>
      </div>
    </Link>
  );
};

CardPost.propTypes = {
  post: PropTypes.object,
};

export default CardPost;
