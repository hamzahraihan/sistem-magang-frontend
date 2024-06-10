import { Link } from 'react-router-dom';
import FormCreatePost from './FormCreatePost';
import { ArrowIcon } from '../../../components/Icons';
import SidebarCreatePost from './SidebarCreatePost';
import { usePostContext } from '../../../hooks/usePostContext';
import CategoryProvider from '../../../context/CategoryContext';

const CreatePost = () => {
  const { handleCreatePost } = usePostContext();

  return (
    <CategoryProvider>
      <div className="col-span-3 pb-10">
        <form className="grid grid-cols-3 gap-5 " onSubmit={handleCreatePost}>
          <div className="lg:order-first flex flex-col gap-4 lg:col-span-2 col-span-3 order-last">
            <Link to="/" className="flex items-center justify-center rotate-180 border border-neutral-300 rounded-full h-10 w-10 hover:bg-neutral-100 transition-all bg-white">
              <ArrowIcon />
            </Link>
            <h1 className="text-xl font-bold">Buat post baru</h1>
            <FormCreatePost />
          </div>
          <SidebarCreatePost />
        </form>
      </div>
    </CategoryProvider>
  );
};

export default CreatePost;
