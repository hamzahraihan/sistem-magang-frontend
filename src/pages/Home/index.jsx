import CardPost from '../../components/CardPost';
import { usePostContext } from '../../hooks/usePostContext';
import SidebarHome from './SidebarHome';

const Home = () => {
  const { post, searchParams } = usePostContext();

  const searchInput = searchParams.get('search');
  const categoryInput = searchParams.get('category_name');

  const getPost = post.filter((item) => {
    const titleMatch = item.title.toLowerCase().includes(searchInput?.toLowerCase());

    const categoryMatch = item.category_name.toLowerCase().includes(categoryInput?.toLowerCase());

    return titleMatch && categoryMatch;
  });

  return (
    <div className="col-span-3">
      <div className="grid grid-cols-3 gap-5">
        <div className="flex flex-col gap-4 lg:col-span-2 col-span-3 pb-10">
          <p className="font-bold lg:text-2xl text-2xl">Informasi</p>
          {getPost.length === 0 ? <div>Tidak ditemukan</div> : getPost.map((item) => <CardPost key={item.post_id} post={item} />)}
        </div>
        <SidebarHome />
      </div>
    </div>
  );
};

export default Home;
