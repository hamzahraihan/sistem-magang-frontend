import CommentBar from './CommentBar';
import UserComment from './UserComment';

const CommentSection = () => {
  return (
    <div className="flex flex-col gap-5 pb-10">
      <h1 className="font-bold text-xl">Komentar</h1>
      <CommentBar />
      <UserComment />
      <UserComment />
      <UserComment />
      <UserComment />
    </div>
  );
};

export default CommentSection;
