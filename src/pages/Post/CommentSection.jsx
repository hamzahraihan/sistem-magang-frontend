import CommentBar from './CommentBar';
import UserComment from './UserComment';

const CommentSection = () => {
  return (
    <div className="flex flex-col gap-2 pb-10">
      <h1 className="font-bold text-xl">Comment</h1>
      <CommentBar />
      <UserComment />
    </div>
  );
};

export default CommentSection;
