import CardPost from '../../components/CardPost';
import { usePostContext } from '../../hooks/usePostContext';
import SidebarHome from './SidebarHome';

const Home = () => {
  const { post, searchParams } = usePostContext();

  const searchInput = searchParams.get('search');

  const getPost = post.filter((item) => item.title.toLowerCase().includes(searchInput.toLowerCase()));

  return (
    <div className="col-span-3">
      <div className="grid grid-cols-3 gap-5">
        <div className="flex flex-col gap-4 lg:col-span-2 col-span-3 pb-10">
          <p className="font-bold lg:text-2xl text-2xl">Informasi</p>
          {getPost.map((item) => (
            <CardPost key={item.post_id} post={item} />
          ))}
        </div>
        <SidebarHome />
      </div>
    </div>
  );
};

export default Home;
