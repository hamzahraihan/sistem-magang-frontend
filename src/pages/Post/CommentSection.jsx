import { Spinner } from '../../components/Icons';
import useFetchComment from '../../features/comment/useFetchComment';
import CommentBar from './CommentBar';
import UserComment from './UserComment';

const Comment = () => {
  const { comment } = useFetchComment();
  console.log('🚀 ~ CommentSection ~ comment:', comment);
  if (comment.length > 0) {
    return (
      <>
        {comment.map((item) => (
          <UserComment key={item.comment_id} comment={item} />
        ))}
      </>
    );
  }
  if (comment.length === 0) {
    return <div className="flex items-center justify-center h-44 text-sm w-full text-gray-400">Jadi yang pertama berkomentar</div>;
  }
};

const CommentSection = () => {
  const { loading } = useFetchComment();

  return (
    <div className="flex flex-col gap-5 pb-10">
      <h1 className="font-bold text-xl">Komentar</h1>
      <CommentBar />
      {loading ? <Spinner /> : <Comment />}
    </div>
  );
};

export default CommentSection;
