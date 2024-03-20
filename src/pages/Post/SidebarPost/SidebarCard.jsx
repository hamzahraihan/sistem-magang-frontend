import { Link } from 'react-router-dom';
import { ClockIcon, TagIcon } from '../../../components/Icons';
import { formatDate } from '../../../utils/formatDate';
import PropTypes from 'prop-types';
import _ from 'lodash';

const SidebarCard = (props) => {
  const { post } = props;
  const imageBackground = {
    backgroundImage: 'url(https://drive.google.com/thumbnail?id=' + post.image + ')',
  };
  return (
    <div className="border border-neutral-200 rounded-[32px]">
      <Link to={`/detail-post/${_.kebabCase(post?.title)}`} state={{ post_id: post?.post_id }}>
        <div className="bg-no-repeat bg-cover bg-center h-32 rounded-se-[32px] rounded-ss-[32px]" style={imageBackground}></div>
      </Link>
      <div className="flex flex-col gap-3 p-7">
        <div className="flex gap-2">
          <p className="flex gap-1 items-center text-neutral-700 text-xs">
            <ClockIcon />
            {formatDate(post.updatedAt)}
          </p>
          <p className="flex gap-1 items-center text-neutral-700 text-xs">
            <TagIcon />
            {post.category_name}
          </p>
        </div>
        <p className="text-sm font-bold line-clamp-2">{post.title}</p>
        <p className="text-neutral-400 underline">
          {post?.Mahasiswa?.first_name}
          {post?.Dosen?.first_name}
          {post?.Admin?.first_name}
        </p>
      </div>
    </div>
  );
};

SidebarCard.propTypes = {
  post: PropTypes.object,
};

export default SidebarCard;
