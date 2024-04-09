import { Link } from 'react-router-dom';
import { ClockIcon, TagIcon } from './Icons';
import { formatDate } from '../utils/formatDate';
import PropTypes from 'prop-types';
import _ from 'lodash';
import DOMPurify from 'dompurify';
import { pickRole } from '../utils/pickRole';
import { slugify } from '../utils/slugify';
import { getRoleId } from '../utils/getRoleId';

const CardPost = (props) => {
  const { post } = props;

  const imageBackground = {
    backgroundImage: `url(https://drive.google.com/thumbnail?id=${post?.image}&sz=w680)`,
  };

  const options = {
    ALLOWED_TAGS: ['p', 'br', 'b', 'i', 'strong', 'em'],
    ALLOWED_ATTR: ['href', 'title', 'alt'],
  };

  const sanitizeContent = DOMPurify.sanitize(post?.description, options);

  return (
    <div className="flex flex-col">
      <Link to={`/detail-post/${_.kebabCase(post?.title)}`} state={{ post_id: post?.post_id }}>
        {post.image && <div className="border border-neutral-200 lg:h-96 h-52 rounded-[32px] bg-cover bg-no-repeat bg-center" style={imageBackground}></div>}
      </Link>
      <div className="p-5 flex flex-col gap-2">
        <Link to={`/detail-post/${_.kebabCase(post?.title)}`} state={{ post_id: post?.post_id }} className="flex flex-col gap-2">
          <div className="flex gap-2">
            <p className="flex gap-1 items-center text-neutral-700 text-sm">
              <ClockIcon />
              {formatDate(post?.updatedAt)}
            </p>
            <p className="flex gap-1 items-center text-neutral-700 text-sm">
              <TagIcon />
              {_.capitalize(post?.category_name)}
            </p>
          </div>
          <p className="text-base font-bold">{post?.title}</p>
          <p className="line-clamp-3" dangerouslySetInnerHTML={{ __html: sanitizeContent }} />
        </Link>
        <Link to={`/profile/${pickRole(post)?.role}/${_.kebabCase(slugify(post))}`} state={{ userId: getRoleId(post) }} className="text-neutral-400 underline">
          {pickRole(post)?.first_name}
        </Link>
      </div>
    </div>
  );
};

CardPost.propTypes = {
  post: PropTypes.object,
};

export default CardPost;
