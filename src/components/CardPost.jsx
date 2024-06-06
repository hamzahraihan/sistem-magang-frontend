import { Link } from 'react-router-dom';
import { ClockIcon, TagIcon } from './Icons';
import { formatDate } from '../utils/formatDate';
import PropTypes from 'prop-types';
import _ from 'lodash';
import DOMPurify from 'dompurify';
import { slugify } from '../utils/slugify';
import { getRoleId } from '../utils/getRoleId';

// card post use for index/homepage
const CardPost = (props) => {
  const { post } = props;

  // option to sanitize content from ReactQuill input component
  const options = {
    ALLOWED_TAGS: ['p', 'br', 'b', 'i', 'strong', 'em'],
    ALLOWED_ATTR: ['href', 'title', 'alt'],
  };

  // sanitize using DOMPurify
  const sanitizeContent = DOMPurify.sanitize(post?.description, options);

  return (
    <div className=" flex flex-col bg-white rounded-3xl border border-gray-200">
      <Link to={`/detail-post/${_.kebabCase(post?.title)}`} state={{ post_id: post?.post_id }}>
        {post.image && <img src={`https://drive.google.com/thumbnail?id=${post?.image}&sz=w680`} className="border border-neutral-200 lg:h-96 h-52 w-full rounded-3xl object-cover object-center " alt="post-pict" />}
      </Link>
      <div className="p-5 flex flex-col gap-2">
        <Link to={`/detail-post/${_.kebabCase(post?.title)}`} state={{ post_id: post?.post_id }} className="flex flex-col">
          <p className="text-base font-bold">{post?.title}</p>
          <div className="flex gap-2">
            <p className="flex gap-1 items-center text-neutral-400">
              <ClockIcon />
              {formatDate(post?.updatedAt)}
            </p>
            <p className="flex gap-1 items-center text-neutral-400">
              <TagIcon />
              {_.capitalize(post?.category_name)}
            </p>
          </div>
          <p className="line-clamp-3 pt-2" dangerouslySetInnerHTML={{ __html: sanitizeContent }} />
        </Link>
        <Link to={`/profile/${post?.role}/${_.kebabCase(slugify(post))}`} state={{ userId: getRoleId(post) }} className="text-neutral-400 underline">
          {post?.author}
        </Link>
      </div>
    </div>
  );
};

CardPost.propTypes = {
  post: PropTypes.object,
};

export default CardPost;
