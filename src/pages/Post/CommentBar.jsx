import { ArrowIcon } from '../../components/Icons';

const CommentBar = () => {
  return (
    <div className="flex relative ">
      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
        <div className="h-10 w-10 bg-slate-500 animate-pulse rounded-full"></div>
      </div>
      <input type="text" name="post" id="post" className="w-full ps-16 focus:outline-none rounded-xl p-5 me-3 text-xs ring-0" placeholder="Buat komentar..." required />
      <button className="flex items-center justify-center bg-primaryColor rounded-md w-20 hover:bg-hoverColor active:bg-activeColor transition-all">
        <ArrowIcon />
      </button>
    </div>
  );
};

export default CommentBar;
